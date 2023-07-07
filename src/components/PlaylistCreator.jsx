import { useEffect } from "react";
import { errorSelector, useRecoilState } from 'recoil'
import { tokenState, genresWithTracksState } from "../assets/atoms"
import { getUserId, createPlaylist } from "../assets/api";


export default function PlaylistCreator() {
    const [token, setToken] = useRecoilState(tokenState)
    const [genresWithTracks, setGenresWithTracks] = useRecoilState(genresWithTracksState)




    useEffect(() => {
        getUserId(token).then(userId => {
            createPlaylist(token, "test1", userId).then(() => {
                console.log("Playlist Created")
            }).catch(err => {
                console.error(`Error creating playlist:${err}`)
            })
        }).catch(err => {
            console.log(err)
        })

    }, [])
    return <></>;
}

