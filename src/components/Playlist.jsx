
import shuffle from '../assets/img/shuffle.svg'
import musicNote from '../assets/img/music-note.png'
import { Link, Route, Routes } from 'react-router-dom'


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
            <Link to={`splitter/${props.id}`} className='shuffle-btn'>
                <button>
                    <img src={shuffle}></img>
                </button>
            </Link>

        </div >

    )
}