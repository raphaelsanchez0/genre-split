import React from 'react'
import heroImage from '../assets/img/hero-image.png'
import Login from './Login'
import { Link } from 'react-router-dom'
import Footer from './Footer'


export default function Landing() {
    return (
        <div className='landing'>
            <div className='text'>
                <h1>Organize Your Playlists</h1>
                <h3>Sort your liked songs (and more) into Genre-Specific Collections</h3>
                {/* <Link to="/" className='login-link'>
                    <button className='login-button'>Login with Spotify</button>
                </Link> */}
                <Login text="Login with Spotify" class="login-alt" />
            </div>
            <img src={heroImage} className='hero-image'></img>

        </div>
    )
}
