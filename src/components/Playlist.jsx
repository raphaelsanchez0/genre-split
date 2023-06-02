
import shuffle from '../assets/img/shuffle.svg'
import musicNote from '../assets/img/music-note.png'


export default function Playlist(props) {
    return (
        <div className="playlist">
            <img src={props.coverImage} className='heart' />
            <div className='text'>
                <h2>{props.title}</h2>
                <div className='songs-stat'>
                    <img className="music-note" src={musicNote}></img>
                    <h3>{props.numOfTracks} Tracks</h3>
                </div>

            </div>
            <button className='shuffle-btn'>
                <img src={shuffle}></img>
            </button>

        </div>
    )
}