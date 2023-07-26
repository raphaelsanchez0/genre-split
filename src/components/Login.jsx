import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { tokenState, userIdState, userPlaylistsState } from '../assets/atoms'
import { getUserId } from '../assets/api'


export default function Login() {
  const [token, setToken] = useRecoilState(tokenState)

  const [userId, setUserId] = useRecoilState(userIdState)
  const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState)


  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = 'playlist-modify-public playlist-read-private user-library-read user-read-private user-read-email playlist-read-collaborative'

  useEffect(() => {
    const hash = window.location.hash;
    let newToken = null;
    if (hash) {
      newToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = ""; // Clear the hash to prevent reusing the token if the user refreshes the page.
      window.localStorage.setItem("token", newToken);
    }
    setToken(newToken);
  }, []);


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

  }, [token])

  const handleLogout = () => {
    setToken("");
    setUserId(""); // Clear user ID as well, since it's associated with the token.
    setUserPlaylists([]);
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