import { createReducer } from "@reduxjs/toolkit";

export const webRTCReducer = createReducer({
    localStream : null , 
    audioOnly : null ,
    mySocketId : null
} , (builder) => {
    builder.addCase('setLocalStream' , (state , action) => {
        state.localStream = action.payload;
    }) 
    builder.addCase('setAudioOnly' , (state , action) => {
        state.audioOnly = action.audioOnly;
    })
    builder.addCase('setSocketId' , (state , action) => {
        state.mySocketId = action.mySocketId;
    })
})