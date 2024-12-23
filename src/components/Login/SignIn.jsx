import React, { useState, useContext } from "react";
import { Context } from "../../context/context"; 
import "./Login.css"; // Reuse styles for consistency

function SignIn({ onSignUp, closeSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useContext(Context); // Get theme from context

  const handleSignUp = () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("All fields are required!");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      onSignUp(username, password); // Pass new user data to parent component
      alert("Sign up successful! You can now log in.");
      closeSignIn(); // Close SignIn modal
    }
  };

  const isButtonDisabled = !username.trim() || !password.trim() || !confirmPassword.trim();

  return (
    <div className={`login-overlay ${theme}`}>
      <div className={`login-container ${theme}`}>
        <div className="login-header">
          <div className="sign-in">
            <i className="fas fa-user-plus login-icon"></i>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        </div>
        
        <div className="login-buttons">
          <button
            onClick={handleSignUp}
            disabled={isButtonDisabled}
            className="login-btn"
          >
            Sign Up
          </button>
          <button onClick={closeSignIn}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
