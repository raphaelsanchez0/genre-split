import { useState } from "react";
import Artists from "./Artists";
import { useRecoilState } from 'recoil'

import { numOfItems, itemType } from '../assets/atoms'
import Playlist from "./Playlist";

export default function Content() {


    return (
        <div className="content">
            <h1>Your Playlists</h1>
            <div className="playlists">
                <Playlist />
                <Playlist />
            </div>

        </div>
    )

}