import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/context";
import "./Main.css";
import { assets } from "../../assets/assets";
import Login from "../Login/Login";

const Main = () => {

  const [username, setUsername] = useState(""); // Stores the username
  const [isLoginVisible, setIsLoginVisible] = useState(false); // Controls Login visibility

  const getInitial = () => {
    if (!username) return ""; // Default initial
    return username.charAt(0).toUpperCase(); // First letter of username
  };


  const handleLogin = (username) => {
    setUsername(username);
  };


  const closeLogin = () => {
    setIsLoginVisible(false); // Close the login form
  };

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    theme, // Access theme
  } = useContext(Context);

  const inputRef = useRef(null); // Ref to focus the input box

  const handleSend = () => {
    if (input.trim() === "") return; // Avoid sending empty prompts
    onSent(); // Trigger the existing onSent logic
    setInput(""); // Clear the input value
  
    // Reset the textarea height to its default
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };
  

  useEffect(() => {
    // Event listener for global shortcuts
    const handleGlobalShortcuts = (e) => {
      // "Ctrl+/" to focus the input box
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault(); // Prevent default browser behavior
        inputRef.current.focus();
      }

      // "Enter" to send the prompt when input is focused
      if (e.key === "Enter" && document.activeElement === inputRef.current) {
        onSent();
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleGlobalShortcuts);

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleGlobalShortcuts);
    };
  }, [onSent]);

  return (
    <div className={`main ${theme}`}>
      <div className="nav">
        <p className={`Gemini ${theme}`}>Gemini-ChatBot</p>


         {/* User Icon */}
          <div>
          <div>
          {username ? (
            <div className="user-icon">{getInitial()}</div> // Display first letter of username
          ) : (
            <button
              onClick={() => setIsLoginVisible(true)}
              className="login-button"
            >
              Login
            </button>
          )}
          {isLoginVisible && (
            <Login onLogin={handleLogin} closeLogin={closeLogin} />
          )}
        </div>
     
    </div>
  

      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>{username ? `Hello, ${username}!` : "Hello, Team!"}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful views to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <p className="prompt-user">{getInitial()? getInitial(): <img src={assets.user_icon}/>}</p>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="output-container"
                />
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
  <div className="search-box">
    <textarea
  placeholder="Enter prompt here"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  ref={inputRef} // Attach ref to the textarea
  rows="1" // Start with a single row
  onInput={(e) => {
    e.target.style.height = "auto"; // Reset height before recalculating
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
  }}
  style={{
    resize: "none", 
    overflow: "hidden", 
  }}
></textarea>

    <div>
      
      <img
        src={assets.send_icon}
        alt="Send Icon"
        onClick={handleSend}
      />
    </div>

   
  </div>
</div>

      </div>
    </div>
  );
};

export default Main;
