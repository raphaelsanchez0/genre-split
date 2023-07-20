import { useEffect, useState } from "react";
import { errorSelector, useRecoilState } from 'recoil'
import { tokenState, genresWithTracksState } from "../assets/atoms"
import { getUserId, createPlaylist, createArrayOfFormatedSpotifyURIs, convertToSpotifyURI } from "../assets/api";

export default function PlaylistCreator() {
    const [token, setToken] = useRecoilState(tokenState)
    const [genresWithTracks, setGenresWithTracks] = useRecoilState(genresWithTracksState)
    const [userId, setUserId] = useState("")
    const [currentPlaylistId, setCurrentPlaylistId] = useState("")

    useEffect(() => {
        getUserId(token)
            .then(async (userId) => {
                setUserId(userId);

                await Promise.all(
                    genresWithTracks.map(async (genre) => {
                        if (genre[3] === true) {
                            // If the track has been selected by the user
                            try {

                                const playlistData = await createPlaylist(token, genre[0], userId);
                                //creates a new playlist for the genre
                                const playlistId = playlistData.id;

                                const tracksInGenre = genre[2]

                                const URIs = createArrayOfFormatedSpotifyURIs(tracksInGenre);

                                //get all the ids from genre[2]
                                console.log(URIs)

                            } catch (err) {
                                console.log(err);
                            }
                        }
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <></>;
}

