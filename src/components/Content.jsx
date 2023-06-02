import { useState } from "react";
import Artists from "./Artists";
import { useRecoilState } from 'recoil'
import heart from '../assets/img/heart.png'

import { numOfItems, itemType } from '../assets/atoms'
import Playlist from "./Playlist";

export default function Content() {
    const [receivedPlaylists, setReceivedPlaylists] = useState(true);



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