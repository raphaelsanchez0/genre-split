import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { tokenState, userIdState, userPlaylistsState } from '../assets/atoms'
import { getTopItems, getLikedTracks, getUserId } from '../assets/api'


export default function Login() {
  //const [token, setToken] = useState("")
  const [token, setToken] = useRecoilState(tokenState)

  const [userId, setUserId] = useRecoilState(userIdState)
  const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState)


  const CLIENT_ID = "420d2cfc497641c4965d36181d8c04a9"
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = 'playlist-modify-public playlist-read-private playlist-modify-private user-top-read user-library-read user-read-private user-read-email playlist-read playlist-read-collaborative'

  //checks for token in local storage and sets token's state to that token if so
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      // window.location.hash = ""
      // window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])


  useEffect(() => {
    // Use a Promise to wait for the token to exist
    const getTokenPromise = new Promise(resolve => {
      if (token) {
        resolve();
      }
    });
    if (token) {
      // Only make the API request once the token exists
      getTokenPromise.then(async () => {
        try {
          // const likedTracks = await getLikedTracks(token)
          // setLikedSongs(likedTracks);
          const userId = await getUserId(token)
          setUserId(userId)


        } catch (error) {
          console.log(error)
        }
      });
    }



    console.log("token: ", token)







  }, [token])

  const handleLogout = () => {
    setToken("")
    setUserPlaylists([])
    window.localStorage.removeItem("token")

  }


  function handleLogin(e) {
    e.preventDefault();
    const scopes = SCOPE.replace(' ', '%20');
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}&show_dialog=${true}`
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
        : <button onClick={handleLogout} className="login">Logout</button>}

    </>
  )
}