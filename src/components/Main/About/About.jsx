import React, { useContext, useState } from "react";
import "./About.css";
import { Context } from "../../../context/context";

const About = () => {
  const { theme } = useContext(Context);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility of the About section

  return (
    isVisible && (
      <div className={`about-section ${theme}`}>
        
      
        <h2 className={`about-title ${theme}`}>About the Project</h2>
        <p className={`about-description ${theme}`}>
          Welcome to the Gemini Chatbot Clone, a React-based application designed to simulate the interface and functionality of an AI-powered assistant. Built using the modern React framework with Vite for a seamless development experience, this project demonstrates a clean and responsive user interface powered by Google Gemini Studio APIs.
        </p>

        <h3 className={`about-subtitle ${theme}`}>Key Features:</h3>
        <div className={`features-container ${theme}`}>
          <div className={`feature ${theme}`}>
            <h4 className={`feature-title ${theme}`}>Sidebar Navigation</h4>
            <ul className={`feature-list ${theme}`}>
              <li><strong>New Chat:</strong> Start a fresh session to ask new questions.</li>
              <li><strong>Recent:</strong> View all previously entered prompts with options to edit or delete for better session management.</li>
              <li><strong>Additional Tools:</strong>
                <ul className={`nested-list ${theme}`}>
                  <li><strong>Help:</strong> Redirects users to the official Google Gemini Studio API documentation for guidance.</li>
                  <li><strong>Activity:</strong> Displays login-dependent activity information.
                    <ul className={`nested-list ${theme}`}>
                      <li>If not logged in, users see: "You are not logged in. Please log in."</li>
                      <li>Upon login, the activity panel displays the logged-in username and tracks the total number of prompts sent, with options to delete all recent prompts.</li>
                    </ul>
                  </li>
                  <li><strong>Settings:</strong> Theme Toggle and Analytics for user customization and insights.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className={`feature ${theme}`}>
            <h4 className={`feature-title ${theme}`}>Main Component</h4>
            <ul className={`feature-list ${theme}`}>
              <li><strong>User Login:</strong> A secure login feature that personalizes the application.</li>
              <li><strong>Greeting Message:</strong> Displays a gradient-styled welcome message for logged-in users.</li>
              <li><strong>Prompt Input:</strong> Users can enter queries in the input box, processed independently to display results below.</li>
            </ul>
          </div>

          <div className={`feature ${theme}`}>
            <h4 className={`feature-title ${theme}`}>Integrated React Packages</h4>
            <ul className={`feature-list ${theme}`}>
              <li>React Tour enhances onboarding and usability.</li>
            </ul>
          </div>
        </div>

        <h3 className="about-subtitle">How It Works:</h3>
        <p className={`about-description ${theme}`}>
          The Sidebar organizes essential controls and user settings for efficient navigation. The Main Component handles user interactions, such as login, sending prompts, and viewing results. Leveraging the Google Gemini Studio API, the application delivers precise responses to user queries. The Activity Panel and Analytics ensure transparency by summarizing user engagement.
        </p>
      </div>
    )
  );
};

export default About;
