import { topArtistsState } from '../assets/atoms'



export default function Artist() {
    const [topArtists, setTopArtists] = useRecoilState(topArtistsState);

    useEffect(() => {
        topArtists.then
    })


    return (

        <div className="artist">

        </div>
    )
}