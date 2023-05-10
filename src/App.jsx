import { useState, useEffect } from 'react'
import axios from 'axios'


import './App.scss'
import Header from './Header.jsx'

function App() {
  const [token, setToken] = useState("")

  const [topArtists, setTopArtists] = useState([])


  const CLIENT_ID = "420d2cfc497641c4965d36181d8c04a9"
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = 'user-top-read'





  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])


  useEffect(() => {
    const getTopArtists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTopArtists(response.data.items)
      } catch (error) {
        console.log(error);
      }
    };
    getTopArtists();
  }, [token ])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  
  function handleTopArtists() {
    console.log(topArtists)
  }

  function authorizationFlow(){
    return 
  }



  return (
    <div className='App'>
      <Header/>

        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
            to Spotify</a>
          : <button onClick={logout}>Logout</button>}
        
      



    </div>
  )
}

export default App
