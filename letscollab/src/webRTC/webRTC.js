import { store } from "../redux/store";
import {Peer} from 'peerjs'
import socketService from "../socket/SocketEvent";
let myPeer;
let peers = {};

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

export const setMyPeer = (socketId) => {
    myPeer = new Peer(socketId);
    console.log(socketId , "my socket ID");
    const localStream = store.getState().webRTCReducer.localStream;
    myPeer.on('open' , () => {
        myPeer.on('call', function(call) {
            call.answer(localStream);
            //myPeer.call(call.peer , store.getState().webRTCReducer.localStream); // Answer the call with an A/V stream.
            call.on('stream', function(remoteStream) {
                console.log(remoteStream);
            });
        });
    })

    

    
    
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

export const leaveRoom = (meetingCode) => {
    const localStream = store.getState().webRTCReducer.localStream;

    if(localStream){
        localStream.getTracks().forEach((track) => track.stop());
        store.dispatch({ type: 'setLocalStream', payload: null})
        socketService.emit('conn-leaving');
    }
}

export const deletePeer = (userSocketId) => {
    if(peers[userSocketId]){
        peers[userSocketId].close();
        delete peers[userSocketId];
    }
}



export const prepareForNewPeerConnection = async (userSocketIds , isInitiator) => {
    const localStream = store.getState().webRTCReducer.localStream;

    if(isInitiator){
        console.log("Preparing as initiator");
    }else{
        console.log("Preparing not as initiator");
    }

    //console.log(userSocketIds);

    userSocketIds.forEach(async (ele) => {
        console.log(ele);
        myPeer.on('open' , () => {
            const call =  myPeer.call(ele , store.getState().webRTCReducer.localStream);
            console.log(call);
            call.on('stream', function(stream) {
                console.log(stream);
            });
        })
        
    })

   
}

export const signalingHandler = (data) => {
    const {signal , connUserSocketId} = data;
    
}

