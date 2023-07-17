import { useEffect, useState } from "react";
import { errorSelector, useRecoilState } from 'recoil'
import { tokenState, genresWithTracksState, userIdState, userPlaylistsState } from "../assets/atoms"
import { getUserId, createPlaylist, createArrayOfFormatedSpotifyURIs, convertToSpotifyURI, addToPlaylist } from "../assets/api";

export default function PlaylistCreator(props) {
    const [token, setToken] = useRecoilState(tokenState)
    const [genresWithTracks, setGenresWithTracks] = useRecoilState(genresWithTracksState)
    const [userId, setUserId] = useRecoilState(userIdState)
    const [currentPlaylistId, setCurrentPlaylistId] = useState("")

    const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState)

    const [createdPlaylists, setCreatedPlaylists] = useState([])

    const [userMessage, setUserMessage] = useState("")

    function handleCreatedPlaylistString(playlists) {
        const length = playlists.length;


        if (length === 1) {
            return `${playlists[0]} playlist has been created`;
        }

        const allButLast = playlists.slice(0, length - 1).join(', ');
        const last = playlists[length - 1];

        return `${allButLast}, and ${last} playlists have been created`;
    }



    useEffect(() => {
        console.log(userPlaylists, "userplaylist");

        (async () => {
            try {
                await Promise.allSettled(
                    genresWithTracks.map(async (genre) => {
                        if (genre[3] === true) {
                            // If the track has been selected by the user
                            const playlistData = await createPlaylist(token, genre[0], userId);
                            setCreatedPlaylists(prevCreatedPlaylists => [...prevCreatedPlaylists, genre[0]])
                            // creates a new playlist for the genre
                            const playlistId = playlistData.id;
                            const tracksInGenre = genre[2];
                            const URIs = createArrayOfFormatedSpotifyURIs(tracksInGenre);
                            // get all the ids from genre[2]
                            const response = await addToPlaylist(token, playlistId, URIs);
                            console.log(response, "test");
                        }
                    })
                );

                setUserMessage(handleCreatedPlaylistString(createdPlaylists));
            } catch (err) {
                console.error(err);
            }
        })();
    }, [genresWithTracks]);

    return <>
        {userMessage === "" ? <></> : <h1>{userMessage}</h1>}


    </>;
}

