import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CreatedPlaylistMessage({ message: playlist }) { // Destructuring props for cleaner syntax

    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (playlist === "Done") {
            setIsDone(true);
        } else {
            setIsDone(false);
        }
    }, [playlist]);  // This effect runs whenever the `playlist` prop changes

    const displayText = isDone
        ? "All playlists created!  Start over?"
        : `A ${playlist} playlist has been created!`;

    const style = isDone
        ? { backgroundColor: '#60f086' }
        : {};

    return isDone ? (
        <Link to="/" className='created-playlist-message' style={style}>
            <h3 >
                {displayText}
            </h3>
        </Link>
    ) : (
        <h3 className='created-playlist-message' style={style}>
            {displayText}
        </h3>
    );
}