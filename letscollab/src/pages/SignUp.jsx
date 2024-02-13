import React, { useEffect, useState } from 'react'
import '../css/Auth.css'
import User_Avatar from '../assests/img/user_avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const dispatch = useDispatch();
    
    const { message, error} = useSelector(
        state => state.authReducer
      );


      useEffect(() => {
        if (error) {
            console.log(error);
          toast.error(error);
          dispatch({ type: 'clearError' });
        }
    
        if (message) {
          console.log(message);
          toast.success(message);
          dispatch({ type: 'clearMessage' });
        }
      }, [error, message]);

    const signUp = () => {
        dispatch(register(email , name , password));
    }

  return (
    <div className='SignInBg'>
        <div className='SignInBg-2'>
            <h1 className='mainHead'>
                Create New Account
            </h1>
            <img src={User_Avatar} alt="" className='avatar-img'/>
            <input type="text" placeholder='Enter your Full Name . . .' className='auth-input' value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder='Enter your email . . .' className='auth-input' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="text" placeholder='Enter your password . . .' className='auth-input' value={password} onChange={e => setPassword(e.target.value)}/>
            <div className="signIn-button" onClick={signUp}>
                Sign Up
            </div>
        </div>
        <div className='SignInBg-1'>
            {/* <h1 className='title-signIn'>
                CollabSync
            </h1> */}

            <h1 className='title-signIn'>
                Already Signed Up ?
            </h1>

            <p className='desp1'>
                Login and access your current account
            </p>

            <button className='signIn-button signUp-button' >
                Sign In
            </button>
        </div>
    </div>
  )
}

export default SignUp