import React, { useEffect, useState } from "react";
import Nav from "../HeroApp/Nav.jsx";
import { Ping } from "ldrs/react";
import "ldrs/react/Ping.css";
import "./Ai.css";
import axios from "axios";
import Entrycard from "./Entrycard.jsx";

const openrouter = import.meta.env.VITE_OPENROUTER_KEY;

function Ai() {
  const [showNotif, setShowNotif] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => setPrompt(e.target.value);
 
  const sendReq = async () => {
    if (!prompt.trim()) return; //empty prompt
    try {
      setLoading(true);
     
    const systemPrompt = `
Please provide the response ONLY in the following exact JSON structure.

{
  "technology": "<technology_name>",
  "number_of_weeks": "<week_plan_length>", 
  "week_plan": [
    {
      "week": 1,
      "concepts": ["<concept_1>", "<concept_2>", "..."],
      "milestone_project": "<project_name>"
    },
    {
      "week": 2,
      "concepts": ["<concept_1>", "<concept_2>", "..."],
      "milestone_project": "<project_name>"
    }
    // Add as many weeks as needed if user mentions, else based on your recommendation
  ],
  "top_one_shot_videos": [
    {
      "title": "<video_title>",
      "url": "<video_url>",
      "views": "<views_count>",
      "channel_name": "<channel>"
    }
    // Add multiple videos if needed (min and max 4)
  ],
  "free_reading_resources": [
    {
      "title": "<resource_title>",
      "url": "<resource_url>",
      "website": "<website_name>"
    }
    // Add multiple reading resources if needed (min and max 4)
  ],
  "roadmap_sh": {
    "url": "<roadmap_url>",
    "steps": ["<step_1>", "<step_2>", "..."]
  },
  "top_playlists": [
    {
      "title": "<playlist_title>",
      "url": "<playlist_url_or_NA>",
      "channel_name": "<channel>",
      "views": "<views_count_or_NA>"
    }
    // Add multiple playlists (exactly 4)
  ],
  "milestone_projects": [
    "<project_1>",
    "<project_2>"
    // Add up to 5 milestone projects
  ],
  "tips_and_tricks": [
    "<tip_1>",
    "<tip_2>",
    "<tip_3>",
    "<tip_4>"
    // Add minimum 5 learning tips
  ]
}

You must always use these exact keys, structure, and nesting and fill with real values.
If the prompt does not specify weeks, use "number_of_weeks": null and recommend weeks.
Only fill contents per technology. DO NOT change keys or format.
Output ONLY valid JSON with NO extra text.
`;
 
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      temperature: 0.2,
      top_p: 0.9,
      messages: [
       
        {
          role: "user",
          content: prompt +systemPrompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${openrouter}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Learnflow Ai",
      },
    },
  );
     let data = response.data.choices[0].message.content;

      // If it's already an object (JSON), skip cleaning
      let parsedData;
      if (typeof data === "object") {
        parsedData = data;
      } else if (typeof data === "string") {
        let cleanedData = data.trim();

        // Remove wrapping ```json or ''' if they exist
        cleanedData = cleanedData
          .replace(/^```json\s*/i, "")
          .replace(/^'''/, "")
          .replace(/```$/, "")
          .replace(/'''$/, "");

        // Parse as JSON
        parsedData = JSON.parse(cleanedData);
      } else {
         setShowNotif(true);

  // Hide after 3 seconds
  setTimeout(() => setShowNotif(false), 3000);
        throw new Error("Unexpected response format");
      }

      // console.log(parsedData);
      setResponse(parsedData);

    } catch (err) {
      setShowNotif(true);

  // Hide after 3 seconds
  setTimeout(() => setShowNotif(false), 3000);
      console.error("Facing error with AI model/parsing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Aicont">
      <Nav />

      {!response ? (<>
        <div className="promptbox">
          <input
            type="text"
            value={prompt}
            onChange={handleInput}
            className="search_bar"
            placeholder="Ex: I want to learn java in 4 weeks"
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "text",
            }}
          />
          <button
            id="craft"
            onClick={sendReq}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
           
             
                <svg  id="crft"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sparkles w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  aria-hidden="true"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                Craft

          </button><br/></div>

          {loading && (
            <div className="crafting"
              style={{
                marginTop: "30px",
               backgroundColor: "transparent",
                alignItems: "center",
                gap: "12px",
                transition: "opacity 0.3s ease",
              }}
            >
              <Ping style={{ backgroundColor: "none" }} size="80" speed="2" color="#1f6deb"  />
              <h2
                style={{
                  color: "#1f6deb",
                  fontWeight: 600,
                  animation: "pulseText 1.5s infinite",
                }}
              >
                Crafting your plan...
              </h2>
            </div>
          )}
        </>
      ) : (
        <Entrycard response={response} />
      )}
     {showNotif && (
  <div className="notif">
    <h3>
      Oh snap!<br/>
      <span style={{background:'white',color:"black"}}>
        Whoops! Give it another shot.
        
      </span>
    </h3>
  </div>
)}

     </div>
  );
}

export default Ai;
