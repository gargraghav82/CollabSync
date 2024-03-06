import { configureStore } from '@reduxjs/toolkit'
import authReducers from './reducers/authReducers'
import { webRTCReducer } from './reducers/webRTCReducers'


export const store = configureStore({
  reducer: {
    authReducer : authReducers ,
    webRTCReducer : webRTCReducer
  },
})

export const server = 'http://localhost:4000/api/v1'