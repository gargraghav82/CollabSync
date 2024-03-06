import { store } from "../redux/store";
import { setLocalStream } from "../redux/actions/webRTCActions";
import Peer from 'simple-peer'
import socketService from "../socket/SocketEvent";

const defaultConstraints = {
    video : true , 
    audio : true
}

const onlyAudioConstraints = {
    video : false , 
    audio : true
}

const getConfiguration = () => {
    const turnIceServers = null;

    if(turnIceServers){

    }else{
        console.warn("Using Stun Server");
        return {
            iceServers : [
                {urls : 'stun:stun.1.google.com:19302'}
            ]
        }
    }
}



export const getLocalStreamPreview = (onlyAudio , callbackFunc) => {
    const constraints = !onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        store.dispatch({ type: 'setLocalStream', payload: stream})
        //callbackFunc();
    }).catch((err) => {
        console.log(err);
        console.log("Failed to get Stream :( ");
    })
}

export const leaveRoom = () => {
    const localStream = store.getState().webRTCReducer.localStream;

    if(localStream){
        localStream.getTracks().forEach((track) => track.stop());
        store.dispatch({ type: 'setLocalStream', payload: null})
    }
}

let peers = {};

export const prepareForNewPeerConnection = (newUserSocketId , isInitiator) => {
    const localStream = store.getState().webRTCReducer.localStream;

    if(isInitiator){
        console.log("Preparing as initiator");
    }else{
        console.log("Preparing not as initiator");
    }

    peers[newUserSocketId] = new Peer({
        initiator : isInitiator ,
        config : getConfiguration() ,
        stream : localStream
    });

    peers[newUserSocketId].on('signal' , data => {
        const signalData = {
            signal : data ,
            connUserSocketId : newUserSocketId
        }

        socketService.emit('conn-signal' , signalData);

        // signal data to other users
    })

    

    peers[newUserSocketId].on('stream' , remoteStream => {
        // add remote stream to store
        console.log(remoteStream);
    })

}

export const signalingHandler = (data) => {
    const {signal , connUserSocketId} = data;

    if(peers[connUserSocketId]){
        peers[connUserSocketId].signal(signal);
    }
}

