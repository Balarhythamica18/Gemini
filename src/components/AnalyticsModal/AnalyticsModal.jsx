import React, { useContext,useMemo } from "react";
import { Context } from "../../context/context";
import { assets } from "../../assets/assets";
import "./AnalyticsModal.css";

const AnalyticsModal = ({ closeModal, theme }) => {
  const { prevPrompt } = useContext(Context);

  const uniquePrompts = useMemo(() => {
    //console.log("Calculating unique prompts");
    return Array.from(new Set(prevPrompt));
  }, [prevPrompt]);
  
  
  const totalPrompts = prevPrompt.length;

  return (
    <div className={`modal-overlay ${theme}`}>
      <div className={`modal-content ${theme}`}>
        <button className={`back-btn ${theme}`} onClick={closeModal}>
          <img className="back" src={assets.back_icon} alt="Back" />
        </button>
        
        <h2 className={`header ${theme}`}>Analytics Data</h2>
        <div className={`analytics-data ${theme}`}>
          <p>
            <strong>Total Prompts Sent:</strong> {totalPrompts}
          </p>
          <p>
            <strong>Unique Prompts:</strong> {uniquePrompts.length}
          </p>
        </div>
        <ul className={`unique-prompts ${theme}`}>
          {uniquePrompts.map((prompt, index) => (
            <li key={index}>{prompt}</li>
          ))}
        </ul>
        <button className={`close-modal-btn ${theme}`} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AnalyticsModal;
