import heart from '../assets/img/heart.png'
import shuffle from '../assets/img/shuffle.png'
import musicNote from '../assets/img/music-note.png'


export default function Playlist() {
    return (
        <div className="playlist">
            <img src={heart} />
            <div className='text'>
                <h2>Liked Songs</h2>
                <div className='num-of-songs'>
                    <img className="music-note" src={musicNote}></img>
                    <h3>521 Tracks</h3>

                </div>

            </div>

        </div>
    )
}