import { useEffect, useState } from "react";
import { errorSelector, useRecoilState } from 'recoil'
import { tokenState, genresWithTracksState } from "../assets/atoms"
import { getUserId, createPlaylist } from "../assets/api";


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
                    genresWithTracks.map(async (track) => {
                        if (track[3] === true) {
                            // If the track has been selected by the user
                            try {
                                const playlistData = await createPlaylist(token, track[0], userId);
                                console.log(playlistData);
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

