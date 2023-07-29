import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
            <hr></hr>
            <div className='text'>
                <h5>Made by Raphael Sanchez - Genrify is not related to
                    Spotify AB or any of it’s partners in any way</h5>
                <h5 className='privacy-policy'><Link to={"/privacy"}
                    style={{ textDecoration: 'none', color: 'white' }}
                >Privacy Policy</Link>
                </h5>
            </div>
        </div>
    )
}
