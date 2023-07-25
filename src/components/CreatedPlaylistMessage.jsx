import React from 'react'

export default function CreatedPlaylistMessage({ message }) { // Destructuring props for cleaner syntax

    const displayMessage = message === "Done"
        ? "All playlists created!"
        : `A ${message} playlist has been created!`;

    const style = message === "Done"
        ? { backgroundColor: '#60f086' }
        : {};
    return (
        <h3 className='created-playlist-message' style={style}>
            {displayMessage}
        </h3>
    )
}