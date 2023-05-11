import './App.scss'
import Navbar from './Navbar.jsx'
import { useState } from 'react'

import { useRecoilState } from 'recoil'
import { topArtistsState } from './topArtistsState'

function App() {

  const [topArtists, setTopArtists] = useRecoilState(topArtistsState)
  function handleTopArtists() {
    console.log(topArtists)
  }

  return (
    <div className='App'>
      <Navbar />

      <button onClick={handleTopArtists}></button>




    </div>
  )
}

export default App
