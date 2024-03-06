import { MeetRoom } from "../models/MeetRoom.js";
import { user } from "../models/User.js";

export const createRoom = async (meetCode , hostId , hostSocketId , map) => {
    const newRoom = new MeetRoom({
        meetCode , 
        host : {
            id : hostId ,
            socketId : hostSocketId
        }
    })

    await newRoom.save();
}

export const joinRoom = async (meetCode , participantId , participantSocketId , socket) => {

    const meetRoom = await MeetRoom.findOne({meetCode});

    if(meetRoom){
        let flag = false;

        meetRoom.participants.forEach((ele) => {
            if(ele.id == participantId){
                flag = true;
            }
        })

        if(meetRoom.host.id !== participantId && flag == false){
            meetRoom.participants.push({
                id : participantId ,
                socketId : participantSocketId
            })
        }

        await meetRoom.save();
        const newUser = await user.findById(participantId);

        // prepare for connection

        socket.to(meetRoom.host.socketId).emit('conn-pre' , {
            newUserSocketId : participantSocketId
        });
       
        meetRoom.participants.forEach((ele) => {
            socket.to(ele.socketId).emit('conn-pre' , {
                newUserSocketId : participantSocketId
            });
        })
        
    }else{
        console.log("Incorrect Code");
    }
}

export const notifyConnectionInit = (socket , data) => {
    const {newUserSocketId} = data;

    const initData = {connUserSocketId : socket.id};

    socket.to(newUserSocketId).emit('conn-init' , initData);
}

export const signalHandler = (socket , data) => {
    const {signal , connUserSocketId} = data;

    const signalingData = {signal , connUserSocketId : socket.id};
    socket.to(connUserSocketId).emit('conn-signal' , signalingData);
}

