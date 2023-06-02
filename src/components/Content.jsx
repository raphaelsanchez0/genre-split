import { useState, useEffect } from "react";
import Artists from "./Artists";
import { useRecoilState } from 'recoil'
import heart from '../assets/img/heart.png'
import { numOfItems, itemType, tokenState } from '../assets/atoms'
import { getUserPlaylists } from "../assets/api";


import Playlist from "./Playlist";

export default function Content() {
    const [token, setToken] = useRecoilState(tokenState)
    const [receivedPlaylists, setReceivedPlaylists] = useState(true);
    const [userPlaylists, setUserPlaylists] = useState()

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
                const userPlaylists = await getUserPlaylists(token)
                setUserPlaylists(userPlaylists);
                console.log(userPlaylists)

            } catch (error) {
                console.log(error)
            }
        });
    }, [token])


    return (
        <div className="content">
            <h1>Your Playlists</h1>

            {!receivedPlaylists ?
                <button className="getPlaylists"></button>


                : <div className="playlists">
                    <Playlist coverImage={heart} title="Liked Songs" numOfTracks="521" />
                    <Playlist />
                </div>

            }


        </div>
    )

}