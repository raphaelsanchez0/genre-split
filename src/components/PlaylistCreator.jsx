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



    useEffect(() => {
        console.log(userPlaylists, "userplaylist");



        (async () => {
            await Promise.allSettled(
                genresWithTracks.map(async (genre) => {
                    if (genre[3] === true) {
                        // If the track has been selected by the user

                        try {



                            const playlistData = await createPlaylist(token, genre[0], userId);
                            // creates a new playlist for the genre
                            const playlistId = playlistData.id;
                            const tracksInGenre = genre[2];
                            const URIs = createArrayOfFormatedSpotifyURIs(tracksInGenre);
                            // get all the ids from genre[2]
                            const response = await addToPlaylist(token, playlistId, URIs);
                            console.log(response, "test");
                        } catch (err) {
                            console.error(err);
                        }
                    }
                })
            );
        })();
    }, [genresWithTracks]);

    return <></>;
}

