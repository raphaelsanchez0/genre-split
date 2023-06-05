import heart from '../assets/img/heart.png'
import Playlist from './Playlist'

export default function Playlists(props) {
    return (
        <>
            <h1>Your Playlists</h1>
            <div className="playlists">

                <Playlist coverImage={heart} title="Liked Songs" numOfTracks="521" />
                {props.playlists}

            </div>
        </>
    )
}