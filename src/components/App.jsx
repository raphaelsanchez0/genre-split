import '../assets/App.scss'
import Navbar from './Navbar.jsx'
import Content from './Content'
import Landing from './Landing'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from './Footer';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {

  return (
    <div className='App'>
      <Navbar />
      <Content />
      <Footer />
    </div>
  )
}
