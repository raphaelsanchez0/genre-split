import { useState } from "react";
import Artists from "./Artists";
import { useRecoilState } from 'recoil'

import { numOfItems, itemType } from '../assets/atoms'

export default function Content() {

    const [numOfItems, setNumOfItems] = useState(0)
    const [itemType, setItemType] = useState(0)

    const handleSelectNumOfItems = (event) => {
        setNumOfItems(event.target.value)
    }

    const handleSelectItemType = (event) => {
        setItemType(event.target.value)
    }



    return (
        <div className="content">
            <div className="header">

                <h2>Your top </h2>

                <select id="numOfItems" value={numOfItems} onChange={handleSelectNumOfItems}>

                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <select id="itemType" value={itemType} onChange={handleSelectItemType}>

                    <option value="Tracks">Tracks</option>
                    <option value="Artists">Artists</option>
                </select>
            </div>
            <Artists></Artists>
        </div>
    )

}