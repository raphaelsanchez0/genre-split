import './App.scss'
import Navbar from './Navbar.jsx'
import { useState } from 'react'

import { useRecoilState } from 'recoil'
import { topArtistsState } from './topArtistsState'
import Content from './Content'
  



export default function App() {

  const [topArtists, setTopArtists] = useRecoilState(topArtistsState)
  function handleTopArtists() {
    console.log(topArtists)
  }

  return (
    <div className='App'>
      <Navbar />

      <button onClick={handleTopArtists}></button>
      <Content/>




    </div>
  )
}
