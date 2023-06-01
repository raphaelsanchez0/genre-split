import '../assets/App.scss'
import Navbar from './Navbar.jsx'
import { useState } from 'react'

import { useRecoilState } from 'recoil'
import { topArtistsState } from '../assets/atoms'
import Content from './Content'




export default function App() {



  return (
    <div className='App'>
      <Navbar />
      <Content />




    </div>
  )
}
