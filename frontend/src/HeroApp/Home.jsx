import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import Nav from "./Nav";
import Working from "./Working"
import api from '../api/axios';

function Home() {

  useEffect(() => {
  api.get("/wakeup");
});

  return (
    <>
      <div className='body'>
        <Nav />
        <div className='hero'>
          <div className='herotext'>
            <h2>Explore. Evolve. <br />Succeed!</h2>
          </div>
          <div className='catch'>
            <h4>
             Master skills, retain knowledge, and achieve learning goals effortlessly — <span>LearnFloow</span> creates the perfect path for your personal growth and success.
            </h4>
          </div>
          <div className='getstarted'>
            <button  onClick={() => (window.location.href = "/app")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              Get Started
            </button>
          </div>
          <div className='hype'>
            <h3>
              What are You waiting for &nbsp;&nbsp;
              <Link to="/contact" id='login'>
                Leave a message<svg fill="#ffffffff" width="20px" height="10px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z"/></svg>
              </Link>
            </h3>
          </div>
        </div>
        <Working/>
      </div>
    </>
  );
}

export default Home;
