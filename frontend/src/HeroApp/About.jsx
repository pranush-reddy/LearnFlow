import React from "react";
import Nav from "./Nav";
import person from "../assets/person.webp"; 
import "./About.css"
import Social from "./Social"
import api from '../api/axios';

function About() {
  
    useEffect(() => {
    api.get("/wakeup");
  });
  
  return (
    <>
      <Nav />
      <section className="me">
        <img width='200em' src={person} alt="Person" />
        <h2>Pranush Reddy🚶‍♂️</h2>
        <p>Hyderabad📍</p>
        <p>Aspiring SDE 💻</p>
      </section>
      <div className="bio"><h2>Meet the Developer</h2><br/>
      <div className="story"><h3>It's Pranush here... Have you ever wonder why I build applications?? because I Love adding my effective skills to solve complex problems... and passionate about building innovative applications using Java and React.js, continuously learning and creating solutions that make a meaningful impact and simplify life.</h3>
        <br/>
        <h3>• &nbsp; Anime &nbsp;&nbsp;&nbsp; •  &nbsp;Code&nbsp;&nbsp;&nbsp; •  &nbsp;Fitness</h3>
      </div>
      <Social/>
      </div>
      
    </>
  );
}

export default About;
