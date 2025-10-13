import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Home.css';

function Nav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav>
        <div className='logo'>
          <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.467 9.5 5.257 8.167 5.257c-2.4 0-4.636.963-6.195 2.704a.2.2 0 00-.03.212c.07.1.18.156.29.156h12.553a.2.2 0 00.183-.105c.06-.09.07-.2.02-.295L12 6.253zm0 13c1.168 0 2.5-.209 3.833-.946 2.4-1.353 4.636-3.589 6.195-6.079a.2.2 0 00.03-.212c-.07-.1-.18-.156-.29-.156h-12.553a.2.2 0 00-.183.105c-.06.09-.07.2-.02.295L12 19.253z"></path>
          </svg>
          <h2 onClick={() => (window.location.href = "/")}>LearnFlow</h2>
        </div>

        <div className='centernav'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/app">Explore</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className='hamburger' onClick={toggleSidebar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/app" onClick={toggleSidebar}>Explore</Link></li>
          <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
          <li><Link to="/about" onClick={toggleSidebar}>About Us</Link></li>
        </ul>
      </div>

      {/* Overlay when sidebar open */}
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Nav;
