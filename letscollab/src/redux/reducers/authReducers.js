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
      state.message = action.payload.message;
      state.isAuthenticated = true;
    })
    .addCase('loginFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('registerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('registerSuccess', (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.isAuthenticated = true;
    })
    .addCase('registerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('loadUserRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('loadUserSuccess', (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    })
    .addCase('loadUserFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    }).addCase('logOutRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('logOutSuccess', (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.isAuthenticated = false;
    })
    .addCase('logOutFail', (state, action) => {
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
