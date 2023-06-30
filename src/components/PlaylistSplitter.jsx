import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getPlaylistInfo, getArtistGenre } from '../assets/api'
import { useRecoilState } from 'recoil'
import { tokenState } from "../assets/atoms"
import Playlist from "./Playlist"
import Track from "../assets/Track";
import GenrePlaylistButton from "./GenrePlaylistButton"

export default function PlaylistSplitter() {
    const [token, setToken] = useRecoilState(tokenState)
    const { id } = useParams()
    const [playlistInfo, setPlaylistInfo] = useState([])
    const [simpleTracks, setSimpleTracks] = useState([])
    const [genreCounter, setGenreCounter] = useState({})

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

            const trackObject = new Track(
                track.name,
                track.id,
                track.artists[0].name,
                (track.artists[0].id).split("/").pop(),
                track.album.images[0].url)

            formatedTracks.push(trackObject)
        })
        return formatedTracks
    }

    async function addGenres(formattedTracks) {
        await Promise.all(
            formattedTracks.map(async track => {
                const genres = await getArtistGenre(token, track.artistId);
                track.setGenres(genres);
            })
        );
        return formattedTracks;
    }

    function getGenreCount(tracks) {
        let genreCount = {};
        tracks.forEach(track => {
            const trackGenres = track.genres

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
            if (genreCount[genre] <= 2) {
                delete genreCount[genre];
            }
        });

        return genreCount;
    }

    function sortJSON(json) {
        // Convert the json object to an array of [key, value] pairs
        let arr = Object.entries(json);

        // Sort the array based on the second element of each pair (i.e., the value)
        arr.sort((a, b) => b[1] - a[1]);

        return arr;
    }
    function addSongsToGenreCount(formatedTrackWithGenres, sortedGenreCount) {
        const modifiedSortedGenreCount = [...sortedGenreCount]; // Create a copy of sortedGenreCount

        formatedTrackWithGenres.forEach((track) => {
            track.genres.forEach((genre) => {
                modifiedSortedGenreCount.forEach((selectedGenre) => {
                    if (genre === selectedGenre[0]) {
                        if (!selectedGenre[2]) {
                            selectedGenre[2] = []; // Create an empty array for tracks if it doesn't exist
                        }
                        selectedGenre[2].push(track); // Append track to the tracks array
                    }
                });
            });
        });

        return modifiedSortedGenreCount; // Return the modified copy of sortedGenreCount
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

                //formats tracks
                const formattedTracks = await formatTracks(playlistInfo)
                //adds genres
                const formatedTrackWithGenres = await addGenres(formattedTracks)
                //finds out how many songs are associated with genres
                const genreCounterWithOutliars = getGenreCount(formatedTrackWithGenres)
                //removes outliars
                const genreCounterWithNoOutliars = eliminateOutliars(genreCounterWithOutliars)
                //sorts genreCounter in decending order
                const sortedGenreCount = sortJSON(genreCounterWithNoOutliars)

                console.log(formatedTrackWithGenres)

                console.log(sortedGenreCount)

                const addedGenreCount = addSongsToGenreCount(formatedTrackWithGenres, sortedGenreCount)

                console.log(addedGenreCount)
            } catch (error) {
                console.log(error)
            }
        });
    }, [token])






    return (
        <div className="playlist-splitter">

            {Object.keys(playlistInfo).length > 0 ?
                <div className="playlist-info">
                    <img src={playlistInfo.images[0].url} />
                    <div className="text-stats">
                        <h1 className="name">{playlistInfo.name}</h1>
                        <h3 className="followers">{`${playlistInfo.followers.total} likes`}</h3>

                    </div>


                </div> : <></>

            }
            <h1>Select the playlists you want to make</h1>
            {/* <h1>{id}</h1>
            <h1>{location.pathname}</h1> */}
            <div className="buttons">
                <div className="genre-playlists-buttons">
                    <GenrePlaylistButton></GenrePlaylistButton>
                    <GenrePlaylistButton></GenrePlaylistButton>
                    <GenrePlaylistButton></GenrePlaylistButton>
                    <GenrePlaylistButton></GenrePlaylistButton>

                    <GenrePlaylistButton></GenrePlaylistButton>
                    <GenrePlaylistButton></GenrePlaylistButton>
                    <GenrePlaylistButton></GenrePlaylistButton>




                </div>
                <div className="split-container">
                    <button className="split">Create Playlists</button>
                </div>

            </div>


        </div>
    )
}