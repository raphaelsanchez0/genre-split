import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlaylistInfo } from '../assets/api'
import { useRecoilState } from 'recoil'
import { tokenState } from "../assets/atoms"

export default function PlaylistSplitter() {
    const [token, setToken] = useRecoilState(tokenState)
    const { id } = useParams()
    const [playlistInfo, setPlaylistInfo] = useState([])

    function createArrayOfOnlyTracks(playlistInfo) {
        const tracks = playlistInfo.tracks.items
        const onlyTracks = tracks.map(rawTrack => {
            return rawTrack.track
        })
        return onlyTracks
    }

    function handleFormatTracks(onlyTracks) {

        let formatedTracks = []
        onlyTracks.forEach(track => {
            let extractedAttributes = {
                name: track.name,
                trackId: track.id,
                artist: track.artists[0].name,
                artistId: track.artists[0].id,
                coverImg: track.album.images[0].url
            }
            formatedTracks.push(extractedAttributes)
        })
        return formatedTracks
    }


    useEffect(() => {
        // Use a Promise to wait for the token to exist
        const getTokenPromise = new Promise(resolve => {
            if (token) {
                resolve();
            }
        });

        // Only make the API request once the token exists
        getTokenPromise.then(async () => {
            try {
                const playlistInfo = await getPlaylistInfo(token, id)
                setPlaylistInfo(playlistInfo);

                const tracks = createArrayOfOnlyTracks(playlistInfo)

                const formattedTracks = handleFormatTracks(tracks)

                console.log(formattedTracks)

            } catch (error) {
                console.log(error)
            }
        });
    }, [token])






    return (
        <h1>{id}</h1>
    )
}