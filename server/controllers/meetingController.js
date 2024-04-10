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
        const UserSocketIds = [];

        UserSocketIds.push(meetRoom.host.socketId);
        
        meetRoom.participants.forEach((ele) => {
            if(participantId != ele.id){
                UserSocketIds.push(ele.socketId);
            }
        })

        socket.emit('conn-pre' , UserSocketIds);
        
    }else{
        console.log("Incorrect Code");
    }
}

export const notifyConnectionInit = (socket , data) => {
    const {newUserSocketId} = data;

    const initData = {connUserSocketId : socket.id};
    console.log("emitted to" , newUserSocketId);
    socket.to(newUserSocketId).emit('conn-init' , initData);
}

export const signalHandler = (socket , data) => {
    const {signal , connUserSocketId} = data;

    const signalingData = {signal , connUserSocketId : socket.id};
    socket.to(connUserSocketId).emit('conn-signal' , signalingData);
}

export const connLeaving = async (meetingCode , socket) => {
    const meetRoom = await MeetRoom.findOne({meetingCode});

    if(meetRoom){
        socket.to(meetRoom.host.socketId).emit('conn-leaving' , {
            UserSocketId : participantSocketId
        });
       
        meetRoom.participants.forEach((ele) => {
            if(socket.id != ele.socketId){
                socket.to(ele.socketId).emit('conn-leaving' , {
                    UserSocketId : socket.id
                });
            }
        })

        const newArray = meetRoom.participants.map((ele) => {
            if(ele.socketId != socket.id){
                return ele;
            }
        })

        meetRoom.participants = newArray;
        await meetRoom.save();
    }
}

