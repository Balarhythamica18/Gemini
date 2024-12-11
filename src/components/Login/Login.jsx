import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/context";  // Import the context
import './Login.css';  // Assuming you have styles for both light and dark themes

function Login({ onLogin, closeLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, theme } = useContext(Context); // Get theme from context

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      loginUser(username);  // Login the user and store their info
      onLogin(username); // Pass username to parent component
      closeLogin(); // Close login modal
    } else {
      alert("Please enter a valid username and password");
    }
  };

  return (
    <div className={`login-overlay ${theme}`}>
      <div className={`login-container ${theme}`}>
        <div className="login-header">
          <div className="login">
            <i className="fas fa-user login-icon"></i>
          </div>
        </div>
        
        <div className="login-inputs">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="login-buttons">
          <button
            onClick={handleLogin}
            disabled={!username.trim() || !password.trim()}
            className="login-btn"
          >
            Log In
          </button>
          <button onClick={closeLogin}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
