import mongoose , {Schema} from "mongoose";

const MeetRoomSchema = new Schema({
    meetCode : {
        type : String ,
        required : true
    } , 
    host : {
        id :  {
            type :Schema.Types.ObjectId ,
            ref : 'User' 
        },
        socketId : String
    } ,
    participants : [{
        id :  {
            type :Schema.Types.ObjectId ,
            ref : 'User' 
        },
        socketId : String
    }] , 
    handRaised : [{
        id :  {
            type :Schema.Types.ObjectId ,
            ref : 'User' 
        },
        socketId : String
    }]
})

export const MeetRoom = mongoose.model("MeetRoom" , MeetRoomSchema);