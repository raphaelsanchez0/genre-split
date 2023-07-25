import { useEffect, useState } from "react";
import { errorSelector, useRecoilState } from 'recoil'
import { tokenState, genresWithTracksState, userIdState } from "../assets/atoms"
import { getUserId, createPlaylist, createArrayOfFormatedSpotifyURIs, convertToSpotifyURI, addToPlaylist } from "../assets/api";
import CreatedPlaylistMessage from "./CreatedPlaylistMessage";

export default function PlaylistCreator() {
    const [token, setToken] = useRecoilState(tokenState)
    const [genresWithTracks, setGenresWithTracks] = useRecoilState(genresWithTracksState)
    const [userId, setUserId] = useRecoilState(userIdState)
    const [currentPlaylistId, setCurrentPlaylistId] = useState("")

    const [createdPlaylists, setCreatedPlaylists] = useState([])
    const [mappingCount, setMappingCount] = useState(0)


    const [finishedCreating, setFinishedCreating] = useState(false)



    useEffect(() => {



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
                            setCreatedPlaylists(prevPlaylists => [genre[0], ...prevPlaylists,])

                        } catch (err) {
                            console.error(err);
                        }
                    }

                })

            ).then(() => setFinishedCreating(true))
        })();

        console.log("createdPlaylists")
    }, [genresWithTracks]);

    useEffect(() => {
        if (createdPlaylists.length)
            console.log(createdPlaylists)
        console.log("test", genresWithTracks)

    }, [createdPlaylists])

    useEffect(() => {
        if (finishedCreating) {
            setCreatedPlaylists(prevPlaylists => ["Done", ...prevPlaylists,])
        }
    }, [finishedCreating])



    const createdPlaylistMessages = createdPlaylists.map(playlistName => {
        return <CreatedPlaylistMessage
            message={playlistName}
        />
    })

    return <div className="created-playlist-messages">

        {createdPlaylistMessages}

    </div>;
}

