import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

const authReducers = createReducer(initialState, (builder) => {
  builder
    .addCase('loginRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('loginSuccess', (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.message = action.payload.message
    })
    .addCase('loginFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('registerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('registerSuccess', (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.message = action.payload.message
    })
    .addCase('registerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('clearError', (state, action) => {
        state.error = null;
      })
      .addCase('clearMessage', (state, action) => {
        state.message = null;
      });
});

export default authReducers;
