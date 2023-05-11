import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { topArtistsState } from './topArtistsState'


export default function Login() {
  const [token, setToken] = useState("")
  const [topArtists, setTopArtists] = useRecoilState(topArtistsState)

  const CLIENT_ID = "420d2cfc497641c4965d36181d8c04a9"
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = 'user-top-read'

  //checks for token in local storage and sets token's state to that token if so
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
    if (token) {
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
    }
  }, [token])




  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }


  function handleLogin(e) {
    e.preventDefault();
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
  }



  return (
    <>

      {/*Only shows logout if not token, because a token means the user is logged in. If not, login allows user to go 
      through Spotify authorization flow.*/}
      {!token ?
        <button
          className="login"
          onClick={handleLogin}
        >Login</button>
        : <button onClick={logout} className="login">Logout</button>}

    </>
  )
}