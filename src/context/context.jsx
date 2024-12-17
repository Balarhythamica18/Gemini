import React, { createContext, useState } from "react";
import runChat from "../config/gemini";//api call imported from the gemini.js used to get a response from the api.

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [theme, setTheme] = useState("light");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // To track login status
  const [username, setUsername] = useState("");  // Username after login
  const [loginTime, setLoginTime] = useState("");  // Time of login
  

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
    setResultData("");
  };
  
  //convert any encoded html entities (like &lt) to their original characters. 
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    const decodedResponse = decodeHtmlEntities(response);
    let responseArray = decodedResponse.split("```");
    let formattedResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 1) {
        formattedResponse += `<pre><code>${responseArray[i]
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>`;
      } else {
        let newResponse = responseArray[i]
          .split("**")
          .map((part, index) =>
            index % 2 === 1 ? `<b>${part}</b>` : part
          )
          .join("")
          .replace(/\n/g, "<br />");
        formattedResponse += `<p>${newResponse}</p>`;
      }
    }

    const words = formattedResponse.split(" ");
    for (let i = 0; i < words.length; i++) {
      delayPara(i, words[i] + " ");
    }

    setLoading(false);
    setInput("");
  };

  // Toggle Analytics Modal
  const toggleAnalytics = () => {
    setShowAnalytics((prev) => !prev);
  };                                                      

  const loginUser = (name) => {
    setUsername(name);
    setLoginTime(new Date().toLocaleTimeString());
    setIsLoggedIn(true);

  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    onSent,
    newChat,
    theme,
    toggleTheme,
    showAnalytics,
    toggleAnalytics,
    isLoggedIn,  // Provide login status
    username,    // Provide username
    loginTime,   // Provide login time
    loginUser,   // Function to log the user in
   
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
