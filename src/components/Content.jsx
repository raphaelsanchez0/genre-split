import { useState, useEffect } from "react";

import { useRecoilState } from 'recoil'
import heart from '../assets/img/heart.png'
import { numOfItems, itemType, tokenState, userPlaylistsState } from '../assets/atoms'
import { getUserPlaylists } from "../assets/api";
import noImage from '../assets/img/no-image.svg'


import Playlist from "./Playlist";
import Playlists from "./Playlists";
import { Route, Routes, useLocation } from "react-router-dom";
import PlaylistSplitter from "./PlaylistSplitter";
import PlaylistCreator from "./PlaylistCreator";

export default function Content() {
    const [token, setToken] = useRecoilState(tokenState)
    const [receivedPlaylists, setReceivedPlaylists] = useState(true);
    const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState)
    const location = useLocation();

    const backgroundColor = location.pathname === "/creator" ? "white" : "";

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

            } catch (error) {
                console.log(error)
            }
        });
    }, [token])

    const playlists = userPlaylists.map((playlist) => {
        const coverImage = playlist.images[0] ? playlist.images[0].url : noImage
        return <Playlist
            id={playlist.id}
            coverImage={coverImage}
            title={playlist.name}
            numOfTracks={playlist.tracks.total}


        />
    })



    return (
        <div className="content" style={{ backgroundColor: backgroundColor }}>

            <Routes>
                <Route path="/" element={<Playlists playlists={playlists} />} />
                <Route path="/splitter/:id" element={<PlaylistSplitter />} />
                <Route path="/splitter/me" element={<PlaylistSplitter />} />
                <Route path="/creator/" element={<PlaylistCreator />} />
            </Routes>

        </div>
    )

}