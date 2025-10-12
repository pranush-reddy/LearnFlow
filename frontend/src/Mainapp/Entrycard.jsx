import React, { useState } from 'react';
import Nav from "../HeroApp/Nav";
import "./Entrycard.css";

function Entrycard({ response }) {
    console.log("Entrycard received response:", response);

  const [activeTab, setActiveTab] = useState("Plan");
const weekPlanLength = response?.week_plan?.length || 0;

  const renderContent = () => {
    switch (activeTab) {
      case "Plan":
        return <div className='maintag plan'>
          <h3>Plan</h3>
          <p>Number of weeks: {response?.number_of_weeks || weekPlanLength}</p>
          <p>Technology: {response?.technology}</p>
          <p>Projects assigned: {response?.milestone_projects.length}</p>
         
          <a href={response?.roadmap_sh?.url} target="_blank" rel="noopener noreferrer">
  View Roadmap<svg fill="#ffffffff" width="20px" height="10px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z"/></svg>
</a>
          {/* You can map through response.week_plan here */}
        </div>;
      case "Playlist":
  return (
    <div className='maintag'>
      <h3>Playlists</h3>
      {response?.top_playlists?.map((playlist, idx) => (
        <div key={idx} className="playlist-item one" >
          <p>Channel: {playlist.channel_name}</p>
          <a
            href={playlist.url !== "NA" ? playlist.url : "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {playlist.title}<svg fill="#ffffffff" width="20px" height="10px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z"/></svg>
          </a>
        </div>
      ))}
    </div>
  );

     case "Video":
  return (
    response?.top_one_shot_videos?.length > 0 && (
      <div className='maintag'>
        <h3>One-Shot Videos</h3>
        {response.top_one_shot_videos.map((video, idx) => (
          <div key={idx} className='oneshot'>
            <p> - {video.channel_name} - {video?.views || "Not mentioned"} views</p>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.title}<svg fill="#ffffffff" width="20px" height="10px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z"/></svg>
            </a>
          </div>
        ))}
      </div>
    )
  );

      case "Resources":
  return (
    <div className='maintag'>
      <h3>Resources</h3>
      {response?.free_reading_resources?.map((resource, idx) => (
        <div key={idx} className="resource-item">
          <p>{resource.title}</p>
          <a
            href={resource.url !== "NA" ? resource.url : "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resource.website}<svg fill="#ffffffff" width="20px" height="10px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z"/></svg>
          </a>
       
</div>
      ))} 
    </div>
  );

      case "Tips":
  return (
    response?.tips_and_tricks?.length > 0 && (
      <div className='maintag'>
        <h3>Tips & Tricks</h3>
       
          {response.tips_and_tricks.map((tip, idx) => (
             <div key={idx} className='tips'><li key={idx}>{tip}</li>
          </div>
        ))}
      </div>
    )
  );
case "Projects":
  return (
    <div className='maintag'>
      <h3>Missions</h3>
      {response?.milestone_projects?.map((ex, idx) => (
        <div key={idx} className='milestones'>
          <li>{ex}</li><br/>
        </div>
      ))}
    </div>
  );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <>
      <section className="dashboard">
        <h1 className='dash'>Dashboard</h1>
        <div className='sidemenu'>
          <a href="#" onClick={() => setActiveTab("Plan")}>Plan</a><br/>
          <a href="#" onClick={() => setActiveTab("Playlist")}>Playlist</a><br/>
          <a href="#" onClick={() => setActiveTab("Video")}>Video</a><br/>
          <a href="#" onClick={() => setActiveTab("Resources")}>Resources</a><br/>
          <a href="#" onClick={() => setActiveTab("Tips")}>Tips</a><br/>
           <a href="#" onClick={() => setActiveTab("Projects")}>Missions</a><br/>
        </div>
      </section>
       <div className="content">
          {renderContent()}
        </div>
    </>
  )
}

export default Entrycard;
