import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [token, setToken] = useState("")

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])


  const CLIENT_ID = "420d2cfc497641c4965d36181d8c04a9"
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
        console.log(token)
    }

    setToken(token)

    }, [])

const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

const renderArtists = () => {
  return artists.map(artist => (
      <div key={artist.id}>
          {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          {artist.name}
      </div>
  ))
}
const getUserTopArtists = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })

  setArtists(data)
  console.log(data)

}




  return (
    <div className='App'>
      <header>
      
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
      </header>
      <form onSubmit ={getUserTopArtists}>
    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
    <button type={"submit"}>Search</button>
    </form>
  

    </div>
  )
}

export default App
