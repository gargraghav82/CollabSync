import React, { useEffect, useState } from 'react'
import '../css/Auth.css'
import User_Avatar from '../assests/img/user_avatar.png'
import {useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/authActions'
import toast from 'react-hot-toast'

const SignIn = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const dispatch = useDispatch();

    const signIn = () => {
        dispatch(login(email , password));
    }

  return (
    <div className='SignInBg'>
        <div className='SignInBg-2'>
            <h1 className='mainHead'>
                Login to your account
            </h1>
            <img src={User_Avatar} alt="" className='avatar-img'/>
            <input type="text" placeholder='Enter your email . . .' className='auth-input' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="text" placeholder='Enter your password . . .' className='auth-input' value={password} onChange={e => setPassword(e.target.value)}/>
            <div className="signIn-button" onClick={signIn}>
                Sign In
            </div>
        </div>
        <div className='SignInBg-1'>
            {/* <h1 className='title-signIn'>
                CollabSync
            </h1> */}

            <h1 className='title-signIn'>
                New Here ?
            </h1>

            <p className='desp1'>
                Sign Up and discover all new features
            </p>

            <button className='signIn-button signUp-button'>
                Sign In
            </button>
        </div>
    </div>
  )
}

export default SignIn