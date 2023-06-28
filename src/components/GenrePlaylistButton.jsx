import { useState } from "react"

export default function GenrePlaylistButton() {
    const [selected, setSelected] = useState(false)

    const toggleState = () => {
        setSelected(prevState => !prevState);
    }

    return (
        <div className="genre-playlists-button">
            <button
                onClick={toggleState}
                style={{
                    backgroundColor: selected ? '#68cf65' : '#e9e9ed',

                }}



            >modern alternative rock</button>
        </div>

    )
}