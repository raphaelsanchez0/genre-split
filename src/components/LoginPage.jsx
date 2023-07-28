import React from 'react'
import Login from './Login'

export default function LoginPage() {

    return (
        <div className='login-page'>
            <h1 className='title'>Genrify</h1>


            <h2>Sort your playlists by genre with the click of a button</h2>
            <Login text="Login with Spotify" className="login" />
        </div>
    )
}
