import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/context";
import "./Main.css";
import { assets } from "../../assets/assets";
import Login from "../Login/Login";
import About from "./About/About";

const Main = () => {
  const [username, setUsername] = useState(""); // Stores the username
  const [isLoginVisible, setIsLoginVisible] = useState(false); // Controls Login visibility
  const [isCopied, setIsCopied] = useState(false); // State to track if code is copied
  const [isAboutVisible, setIsAboutVisible] = useState(false); 


  const toggleAbout = () => {
    setIsAboutVisible(!isAboutVisible); // Toggles the About visibility
  };

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

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible); // Toggle login visibility when user icon is clicked
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
      inputRef.current.style.height = "auto"; // Reset height to default
    }
  };

  const handleCardClick = (text) => {
    setInput(text); // Set the clicked card's text as input
    handleSend(); // Trigger sending the input
  };

  const copyCode = () => {
    const code = resultData.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true); // Set copied state to true
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
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

  // Check if the result contains code (e.g., <code> tags)
  const isCodeResult = resultData.includes("<code>");

  return (
    <div className={`main ${theme}`}>
      <div className="nav">
        <p className={`Gemini ${theme}`}>Gemini-ChatBot</p>

        <div className="nav-right">
          <button onClick={toggleAbout} className="about-button">
            About
          </button>

          {username ? (
            <div className="user-icon" onClick={toggleLogin}>
              {getInitial()}
            </div>
          ) : (
            <button
              onClick={() => setIsLoginVisible(true)}
              className="login-button"
              title="Login"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {isLoginVisible && <Login onLogin={handleLogin} closeLogin={closeLogin} />}

      {isAboutVisible && (
        <div className={`about-overlay ${theme}`}>
          <div className={`about-content ${theme}`}>
          
            <About />
          </div>
        </div>
      )}

     

      <div className="main-container">
      {isAboutVisible && (
  <div className={`about-overlay ${theme}`}>
    <div className={`about-content ${theme}`}>
      <button onClick={toggleAbout} style={{ float: "right" }}>
        ✖
      </button>
      <About /> {/* Render the About component */}
    </div>
  </div>
)}


        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>{username ? `Hello, ${username}!` : "Hello, Team!"}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest beautiful views to see on an upcoming road trip")
                }
              >
                <p>Suggest beautiful views to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Briefly summarize this concept: urban planning")
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Brainstorm team bonding activities for our work retreat")
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Improve the readability of the following code")
                }
              >
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <p className="prompt-user">
                {getInitial() ? getInitial() : <img src={assets.user_icon} alt="User Icon" />}
              </p>
              <p>{recentPrompt}</p>
            </div>
            {isCodeResult && (
              <div className="copy-code-button">
                <button onClick={copyCode} className="copy-button">
                  {isCopied ? "Copied!" : "Copy Code"}
                </button>
              </div>
            )}
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" className="gemini-icon" />
              <div className="language-header"></div>
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
                title="send"
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
