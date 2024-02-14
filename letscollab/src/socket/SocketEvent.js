import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const connectToSocket = (meetingCode) => {
    const socket = io('http://localhost:4000');
      socket.emit('join-room' , meetingCode);
      socket.on('user-connected' , name => {
        toast.success("A New User Joined");
      })
}