import React, { useState } from "react";
import axios from "axios";
import Nav from "../HeroApp/Nav.jsx";
import { Ping } from "ldrs/react";
import "ldrs/react/Ping.css";
import "./Ai.css";
import Entrycard from "./Entrycard.jsx";

function Ai() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => setPrompt(e.target.value);

  const sendReq = async () => {
    if (!prompt.trim()) return; //empty prompt
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/make", { prompt });
      let data = res.data;

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
        throw new Error("Unexpected response format");
      }

      // console.log(parsedData);
      setResponse(parsedData);

    } catch (err) {
      console.error("Error fetching or parsing data:", err);
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
                {loading ? "Crafting..." : "Craft"}

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
              <Ping size="80" speed="2" color="#1f6deb"  />
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
    </div>
  );
}

export default Ai;
