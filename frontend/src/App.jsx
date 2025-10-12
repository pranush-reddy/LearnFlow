import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./HeroApp/Home.jsx"
import About from "./HeroApp/About.jsx"
import Ai from "./Mainapp/Ai.jsx"
import Contact from "./HeroApp/Contact.jsx"

function App() {
  return (<>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />       
        <Route path="/app" element={<Ai />} />  
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router></>

  )
}

export default App