import heart from '../assets/img/heart.png'
import Playlist from './Playlist'

export default function Playlists(props) {
    return (
        <>
            <h1>Your Playlists</h1>
            <div className="playlists">

                <Playlist id="me " coverImage={heart} title="Liked Songs" />
                {props.playlists}

            </div>
        </>
    )
}