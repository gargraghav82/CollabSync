import React, { useEffect, useState } from "react";
import "../css/home.css";
import NavBar from "../comp/NavBar";
import img from "../assests/img/videoConf1.png";
import Footer from "../comp/Footer";
import { useNavigate } from "react-router-dom"
import socketService, { socket } from "../socket/SocketEvent";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/authActions";
import { store } from "../redux/store";
import { setMyPeer } from "../webRTC/webRTC";

const Home = ({isAuthenticated}) => {
  const [meetingCode, setMeetingCode] = useState("");
  const [incorrectCode , setIncorrectCode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    
    
  } , [])

  const {user} = useSelector(state => state.authReducer);

  const enterAMeet = () => {
    setIncorrectCode(true);
    navigate(`/collab?meetingCode=${meetingCode}`);

    // connect to the socket
    socketService.connect();
    socketService.emit('add-detail' , user);
    

    // join the room on server
    socketService.emit('join-room' , meetingCode);
    setMyPeer(socket.id);

    

    setMeetingCode('');
  };

  const createNewMeet = () => {
    const str = "abcdefghijklmnopqrstuvwxyz";
    let newCode = "";
    for(let i = 0 ; i < 10 ; i++){
      const rand = Math.floor(Math.random() * 26);
      newCode += str[rand];
    }
    navigate(`/collab?meetingCode=${newCode}`);


    socketService.connect();
    socketService.emit('add-detail' , user);
    socketService.emit('create-room' , newCode);
    setMyPeer(socket.id);
  }

  return (
    <div className="home">
      <NavBar/>
      <div className="homeMain">
        <div className="textPart">
          <h1 className="mainHead">Online Meeting Platform For Modern Work</h1>
          <h3 className="desp">
            Empower your meeting with face-to-face collaboration and connect
            with your team everywhere , anywhere
          </h3>
          <div className="meet-buttons">
            <div className="host-button" onClick={createNewMeet}>Host A Meeting</div>
            <div className="input-code-area">
              <input
                type="text"
                placeholder="Enter a code to join . . ."
                className="input-code"
                value={meetingCode}
                onChange={e => setMeetingCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.code == "Space" || e.code == 'Enter') enterAMeet();
                }}
              />

              {
                incorrectCode ? <p className="warning">
                InCorrect Meeting Code !!
              </p> : <></>
              }
            </div>
          </div>
        </div>
        <div className="imgPart jump">
          <img src={img} alt="" className="indexImg" />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Home;
