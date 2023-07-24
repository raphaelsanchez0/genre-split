import { useState } from "react"
import search from '../assets/img/search.svg'

export default function GenrePlaylistButton(props) {
    const [selected, setSelected] = useState(false)

    // const toggleState = () => {
    //     setSelected(prevState => !prevState);
    //     props.toggleState();
    // }

    return (
        <div className="genre-playlists-button">
            <button
                onClick={() => props.toggleState(props.genre)}
                style={{
                    backgroundColor: props.selected ? '#68cf65' : '#e9e9ed',

                }}



            >{props.genre}<div className="song-count">{props.songCount} Tracks </div></button>
        </div>

    )
}