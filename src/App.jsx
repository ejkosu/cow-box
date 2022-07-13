import { useState } from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import Home from './components/Home'

function App() {
  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
