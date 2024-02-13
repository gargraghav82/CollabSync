import React, { useEffect, useState } from "react";
import "../css/VideoRoom.css";
import { FiMic, FiMicOff } from "react-icons/fi";
import { IoVideocamOutline, IoVideocamOffOutline } from "react-icons/io5";
import { TbPresentationOff, TbPresentation } from "react-icons/tb";
import { HiOutlineHandRaised, HiOutlineHand } from "react-icons/hi2";
import { MdCallEnd } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { useLocation } from "react-router-dom";

// Import the Socket.IO client library
import { io } from 'socket.io-client';
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// Connect to the Socket.IO server



const VideoRoom = () => {
  const { user } = useSelector(
    state => state.authReducer
  );
  const button = [
    <FiMic />,
    <IoVideocamOutline />,
    <TbPresentation />,
    <HiOutlineHandRaised />,
    <MdCallEnd />,
  ];
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isPresented, setIsPresented] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  // Get specific query parameters
  const meetingCode = queryParams.get('meetingCode');
  

  useEffect(() => {
    const socket = io('http://localhost:4000');
    console.log(socket);
    socket.emit('join-room' , meetingCode , user?.name);
    socket.on('user-connected' , name => {
      toast.success( name + "joined")
    })
  } , [user])

  useEffect(() => {
    console.log(user)
  } , [user]);


  return (
    <div className="videoRoomBg">
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

        <MdCallEnd className="footer-icon call-end" size={25} />
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
