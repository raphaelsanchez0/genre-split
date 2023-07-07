import { useEffect } from "react";
import { useRecoilState } from 'recoil'
import { tokenState, genresWithTracksState } from "../assets/atoms"


export default function PlaylistCreator() {
    const [genresWithTracks, setGenresWithTracks] = useRecoilState(genresWithTracksState)

    useEffect(() => {
        console.log(genresWithTracks)
    }, [])
    return <></>;
}

