import { configureStore } from '@reduxjs/toolkit'
import authReducers from './reducers/authReducers'


export const store = configureStore({
  reducer: {
    authReducer : authReducers
  },
})

export const server = 'http://localhost:4000/api/v1'