import React, { useEffect, useRef, useState } from "react";
import "../css/VideoRoom.css";
import { FiMic, FiMicOff } from "react-icons/fi";
import { IoVideocamOutline, IoVideocamOffOutline } from "react-icons/io5";
import {TbPresentation } from "react-icons/tb";
import { HiOutlineHandRaised} from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { useLocation, useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, connectToSocket, createAnswer, createSocket, deletePeer, getLocalStreamPreview, handleMessageFromPeer, prepareForNewPeerConnection, signalingHandler } from "../webRTC/webRTC";
import { handlePeerJoined} from "../webRTC/webRTC";
import socketService from "../socket/SocketEvent";
import VideoBox from "../comp/VideoBox";
import { leaveRoom } from "../webRTC/webRTC"


// Connect to the Socket.IO server
let localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});



const VideoRoom = () => {
  const dispatch = useDispatch();
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isPresented, setIsPresented] = useState(false);

  useEffect(() => {
    getLocalStreamPreview(videoOn);
  } , [videoOn])

  useEffect(() => {
    socketService.on('conn-pre' , (UserSocketIds) => {
      console.log("Caught");
      prepareForNewPeerConnection(UserSocketIds , false);
    })

    // socketService.on('conn-init' , (data) => {
    //   const {connUserSocketId} = data;
    //   prepareForNewPeerConnection(connUserSocketId , true);
    // })

    // socketService.on('conn-signal' , (data) => {
    //   signalingHandler(data);
    // })

    socketService.on('conn-leaving' , (data) => {
      const {UserSocketId} = data;
      deletePeer(UserSocketId);
    })

    const handleBeforeUnload = (event) => {
      // Your code here
      // For example, you might want to show a confirmation message
      const confirmationMessage = 'Are you sure you want to leave?';
      (event || window.event).returnValue = confirmationMessage; // Standard
      return confirmationMessage; // For some older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      socketService.off('conn-pre' , (data) => {
        const {newUserSocketId} = data;
        prepareForNewPeerConnection(newUserSocketId , false);
        socketService.emit("conn-init" , {
          newUserSocketId
        })
      })
  
      socketService.off('conn-init' , (data) => {
        const {connUserSocketId} = data;
        prepareForNewPeerConnection(connUserSocketId , true);
      })

      socketService.off('conn-signal' , (data) => {
        signalingHandler(data);
      })

      socketService.off('conn-leaving' , (data) => {
        const {UserSocketId} = data;
        deletePeer(UserSocketId);
      })
      
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    
  })


  const [parmas] = useSearchParams();
  const meetingCode = parmas.get('meetingCode');

  const {localStream } = useSelector(state => state.webRTCReducer);
  
  const button = [
    <FiMic />,
    <IoVideocamOutline />,
    <TbPresentation />,
    <HiOutlineHandRaised />,
    <MdCallEnd />,
  ];

  
  

  
  const { message, error} = useSelector(
    state => state.authReducer
  );

  useEffect(() => {
    if (error) {
        console.log(error);
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      console.log(message);
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message , dispatch]);


  return (
    <div className="videoRoomBg">
      <div>
      <VideoBox stream={localStream} isLocalStream={true}/>
    </div>
      <VideoRoomFooter
        button={button}
        videoOn={videoOn}
        micOn={micOn}
        isHandRaised={isHandRaised}
        isPresented={isPresented}
        setMicOn={setMicOn}
        setVideoOn={setVideoOn}
        setIsPresented={setIsPresented}
        setIsHandRaised={setIsHandRaised}
        meetingCode={meetingCode}
      />
    </div>
  );
};

const VideoRoomFooter = ({
  button,
  micOn,
  videoOn,
  isHandRaised,
  isPresented,
  setMicOn,
  setVideoOn,
  setIsPresented,
  setIsHandRaised,
  meetingCode
}) => {
  const dispatch = useDispatch();
  return (
    <div className="videoRoomFooter">
      <div className="part-1">
        <p className="meeting-code">{meetingCode.substr(0 , 3) + '-' + meetingCode.substr(3 , 4) + '-' + meetingCode.substr(7 , 3)}</p>
      </div>
      <div className="part-2">
        {micOn ? (
          <FiMic
            className="footer-icon"
            size={25}
            onClick={() => setMicOn(false)}
          />
        ) : (
          <FiMicOff
            className="footer-icon call-end"
            size={25}
            onClick={() => setMicOn(true)}
          />
        )}
        {videoOn ? (
          <IoVideocamOutline
            className="footer-icon"
            size={25}
            onClick={() => setVideoOn(false)}
          />
        ) : (
          <IoVideocamOffOutline
            className="footer-icon call-end"
            size={25}
            onClick={() => setVideoOn(true)}
          />
        )}
        {!isHandRaised ? (
          <HiOutlineHandRaised
            className="footer-icon"
            size={25}
            onClick={() => setIsHandRaised(true)}
          />
        ) : (
          <HiOutlineHandRaised
            className="footer-icon active-button"
            size={25}
            onClick={() => setIsHandRaised(false)}
          />
        )}
        {!isPresented ? (
          <TbPresentation
            className="footer-icon"
            size={25}
            onClick={() => setIsPresented(true)}
          />
        ) : (
          <TbPresentation
            className="footer-icon active-button"
            size={25}
            onClick={() => setIsPresented(false)}
          />
        )}

        <PiDotsThreeOutlineVerticalFill className="footer-icon" size={25} />

        <MdCallEnd className="footer-icon call-end" size={25} onClick={() => leaveRoom()}/>
      </div>
      <div className="part-3">
        <div className="numb-icon">
          <IoPeople className="footer-icon" size={25} />
          <p className="data-count">2</p>
        </div>
        <LuMessagesSquare className="footer-icon" size={25} />
      </div>
    </div>
  );
};

export default VideoRoom;
