import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getPlaylistInfo, getArtistGenre } from '../assets/api'
import { useRecoilState } from 'recoil'
import { tokenState } from "../assets/atoms"
import Playlist from "./Playlist"
import { Track } from '../assets/Track'

export default function PlaylistSplitter() {
    const [token, setToken] = useRecoilState(tokenState)
    const { id } = useParams()
    const [playlistInfo, setPlaylistInfo] = useState([])
    const [simpleTracks, setSimpleTracks] = useState([])
    const [genreCounter, setGenreCounter] = useState([])

    const location = useLocation()

    function createArrayOfOnlyTracks(playlistInfo) {
        const rundundantTracks = playlistInfo.tracks.items
        const onlyTracks = tracks.map(rawTrack => {
            return rawTrack.track
        })
        return onlyTracks
    }

    //cuts playlistInfo down into an array of tracks, with only whats needed
    function formatTracks(playlistInfo) {

        const tracks = playlistInfo.tracks.items
        //onlytracks contains the tracks with all of their addtional details
        const onlyTracks = tracks.map(rawTrack => {
            return rawTrack.track
        })
        let formatedTracks = []
        onlyTracks.forEach(track => {
            let extractedAttributes = {
                name: track.name,
                trackId: track.id,
                artist: track.artists[0].name,
                artistId: (track.artists[0].id).split("/").pop(),
                coverImg: track.album.images[0].url
            }
            formatedTracks.push(extractedAttributes)
        })
        return formatedTracks
    }

    function addGenres(formattedTracks) {
        formattedTracks.forEach(track => {
            const genrePromise = getArtistGenre(token, track.artistId)
            genrePromise.then(genre => {
                track.genres = genre;
            })
        })
        return formattedTracks;
    }

    function getGenreCount(tracks) {
        let genreCount = {};
        tracks.forEach(track => {
            const trackGenres = track.genres;
            trackGenres.forEach(genre => {
                if (genreCount.hasOwnProperty(genre)) {
                    genreCount[genre] += 1;
                } else {
                    genreCount[genre] = 1;
                }
            });
        });
        return genreCount;
    }

    function eliminateOutliars(genreCount) {
        Object.keys(genreCount).forEach(genre => {
            if (genreCount[genre] === 1) {
                delete genreCount[genre];
            }
        });

        return genreCount;
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
                console.log(playlistInfo)

                const formattedTracks = formatTracks(playlistInfo)

                const formatedTrackWithGenres = addGenres(formattedTracks)

                setSimpleTracks(formatedTrackWithGenres)

                console.log(eliminateOutliars(getGenreCount(simpleTracks)))


            } catch (error) {
                console.log(error)
            }
        });
    }, [token])






    return (
        <>

            {Object.keys(playlistInfo).length > 0 ?
                <div className="playlist-info">
                    <img src={playlistInfo.images[0].url} />
                    <h1>{playlistInfo.name}</h1>

                </div> : <></>

            }
            <h1>{id}</h1>
            <h1>{location.pathname}</h1>


        </>
    )
}