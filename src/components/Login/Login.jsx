import React, { useState, useContext } from "react";
import { Context } from "../../context/context"; 
import './Login.css';  

function Login({ onLogin, closeLogin }) {
  const [isSignIn, setIsSignIn] = useState(false); // Toggle between Login and Sign Up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Only used in Sign Up
  const { loginUser, theme } = useContext(Context); // Get theme from context

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      loginUser(username); // Login the user and store their info
      onLogin(username); // Pass username to parent component
      closeLogin(); // Close login modal
    } else {
      alert("Please enter a valid username and password");
    }
  };

  const handleSignUp = () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("All fields are required!");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Sign up successful! You can now log in.");
      setIsSignIn(false); // Switch back to Login after successful sign-up
    }
  };

  const isLoginDisabled = !username.trim() || !password.trim();
  const isSignUpDisabled = !username.trim() || !password.trim() || !confirmPassword.trim();

  return (
    <div className={`login-overlay ${theme}`}>
       
      <div className={`login-container ${theme}`}>
        <div className="login-header">
          <div className={isSignIn ? "sign-in" : "login"}>
            <i className={`fas ${isSignIn ? "fa-user-plus" : "fa-user"} login-icon`}></i>
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
          {isSignIn && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          )}
        </div>

        <div className="login-buttons">
          {isSignIn ? (
            <>
              <button
                onClick={handleSignUp}
                disabled={isSignUpDisabled}
                className="login-btn"
              >
                Sign Up
              </button>
              <p>
                Already a user?{" "}
                <button
                  onClick={() => setIsSignIn(false)}
                  className="toggle-btn"
                >
                  Log In
                </button>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={handleLogin}
                disabled={isLoginDisabled}
                className="login-btn"
              >
                Log In
              </button>
              <p>
                New user?{" "}
                <button
                  onClick={() => setIsSignIn(true)}
                  className="toggle-btn"
                >
                  Sign Up
                </button>
              </p>
            </>
          )}
          <button onClick={closeLogin} className="close-btn">
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
