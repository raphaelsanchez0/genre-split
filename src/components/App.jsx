import '../assets/App.scss'
import Navbar from './Navbar.jsx'
import Content from './Content'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {

  return (
    <div className='App'>
      <Navbar />
      <Content />
    </div>
  )
}
