import React from 'react'
import Login from './Login'

export default function LoginPage() {

    return (
        <div className='login-page'>
            <h1 className='title'>Please Login</h1>
            <Login text="Login with Spotify" class="login"></Login>

        </div>
    )
}
