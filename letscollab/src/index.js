import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SignIn from './pages/SignIn';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/SignUp';
import VideoRoom from './pages/VideoRoom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/SignIn",
    element: <SignIn/>,
  },
  {
    path: "/SignUp",
    element: <SignUp/>,
  },
  {
    path: "/collab",
    element: <VideoRoom/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    <Toaster />
  </Provider>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
