import React from 'react'
import '../css/Nav.css'

const NavBar = () => {
  return (
    <div className='Nav'>
        <div>
        <h2 className='title'>
            CollabSync
        </h2>
        </div>

        <div className='auth'>
            <div className='signUp butt'>
                Sign Up
            </div>

            <div className='signIn butt'>
                Sign In
            </div>
        </div>
    </div>
  )
}

export default NavBar