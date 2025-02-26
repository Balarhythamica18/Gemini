import React, { useContext, useState, useCallback, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import AnalyticsModal from "../AnalyticsModal/AnalyticsModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";

const Sidebar = () => {
  const [count, setCount] = useState(5); // Countdown value
  const [isOkEnabled, setIsOkEnabled] = useState(false); // State to enable/disable OK button
  const [isOpen, setIsOpen] = useState(true);
  const [currentModal, setCurrentModal] = useState(null);
  const [editingPromptIndex, setEditingPromptIndex] = useState(null);
  const [newPromptText, setNewPromptText] = useState("");
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteAllPrompts = () => {
    setShowConfirmDelete(true); // Show the confirmation modal
  };



   const toggleSidebar = useCallback(() => {
     console.log("toggleSidebar executed.");
     setIsOpen((prevIsOpen) => !prevIsOpen);
   }, []);





  const {
    onSent,
    prevPrompt,
    setRecentPrompt,
    newChat,
    toggleAnalytics,
    theme,
    toggleTheme,
    setPrevPrompt, isLoggedIn, username, loginTime,
  } = useContext(Context);

  const totalPrompts = prevPrompt.length;

  const loadPrompt = useCallback(
    async (prompt) => {
      console.log("loadPrompt executed.");
      setRecentPrompt(prompt);
      await onSent(prompt);
    },
    [setRecentPrompt, onSent]
  );

  const handleActivityClick = () => {
    setShowActivityModal(true);
  };

  

  

   const deletePrompt = useCallback(
     (index) => {
       console.log("deletePrompt executed.");
       const updatedPrompts = prevPrompt.filter((_, i) => i !== index);
       setPrevPrompt(updatedPrompts);
     },
     [prevPrompt, setPrevPrompt]
   );

 



  const openEditModal = (index) => {
    setEditingPromptIndex(index);
    setNewPromptText(prevPrompt[index]);
  };

  const handleEditChange = (e) => {
    setNewPromptText(e.target.value);
  };

 

  const saveEdit = () => {
    const updatedPrompts = [...prevPrompt];
    updatedPrompts[editingPromptIndex] = newPromptText.trim();
    const uniquePrompts = Array.from(new Set(updatedPrompts));
    setPrevPrompt(uniquePrompts);
    setEditingPromptIndex(null);
    setNewPromptText("");
  };
  // Function to delete all prompts
  const deleteAllPrompts = useCallback(() => {
    console.log("All prompts deleted.");
    setPrevPrompt([]); // Clear the prevPrompt array
  }, [setPrevPrompt]);

  useEffect(() => {
    let timer;
    if (showConfirmDelete && count > 0) {
      // Start the countdown when the confirmation modal opens
      timer = setTimeout(() => setCount(count - 1), 1000);
    } else if (count === 0) {
      setIsOkEnabled(true); // Enable the OK button when countdown reaches 0
    }

    return () => clearTimeout(timer); // Cleanup timer
  }, [count, showConfirmDelete]); // Only run the effect when count or showConfirmDelete changes

  const resetCountdown = () => {
    setCount(5); // Reset the countdown when the modal is closed or reset
    setIsOkEnabled(false); // Disable the OK button
  };

  return (
    <div className={`sidebar-container ${theme}`}>
      {/* Constant Menu Icon */}

      <div className={`menu-icon ${theme}`}>
        <img
          onClick={toggleSidebar}
          className={`menu ${theme}`} // Add theme class here
          title="menu"
          src={(theme === "dark" ? assets.menu_icon_light : assets.menu_icon_dark)}
          alt="menu"
        />
      </div>



      {/* Sidebar Component */}
      <div className={`sidebar ${isOpen ? "open" : ""} ${theme}`}>
        <div className="top">
          <div className="new-chat">
            <img onClick={newChat} src={assets.plus_icon} alt="new chat" />
            <p onClick={newChat} title="New Chat">New Chat</p>
          </div>

          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div key={index} className="recent-entry">
                <img src={assets.message_icon} alt="message icon" />
                <div className="recent-entry-content">
                  <p
                    onClick={() => loadPrompt(item)}
                    className="recent-entry-text"
                  >
                    {item.slice(0, 18)}...
                  </p>
                  <div className="recent-actions">
                    <button title="edit" onClick={() => openEditModal(index)}>
                      <FaEdit className="editbtn" />
                    </button>
                    <button
                      title="delete"
                      onClick={() => deletePrompt(index)}
                    >
                      <FaTrash className="trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Section */}
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="question icon" />

            <p title="help">
              <a
                href="https://aistudio.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help
              </a>
            </p>

          </div>

          <div
            className="bottom-item recent-entry"
            onClick={handleActivityClick}
          >
            <img src={assets.history_icon} alt="history icon" />
            <p title="Activity">Activity</p>
          </div>
          <div
            className="bottom-item recent-entry"
            onClick={() => setCurrentModal("settings")}
          >
            <img src={assets.setting_icon} alt="settings icon" />
            <p title="Settings">Settings</p>
          </div>
        </div>

        {/* Activity Modal */}
        {showActivityModal && (
          <div className="modal-overlay">
            <div className={`modal-content ${theme}`}>
              <button
                className="close-btn"
                onClick={() => setShowActivityModal(false)}
              >
                &times;
              </button>

              {isLoggedIn ? (
                <div className="activity-details">
                  <p className="activity-name">
                    Hello, <span className="name">{username}!</span>
                  </p>
                  <p className="login-time">You logged in Today {loginTime}</p>
                  <div className="history">
                    <p>Your Total Search count: {totalPrompts}</p>
                    <p>
                      Want to delete your search history?

                      <button onClick={handleDeleteAllPrompts} className="delete-btn" > Delete</button>
                    </p>
                  </div>
                </div>


              ) : (
                <div>
                  <i className="fas fa-exclamation-triangle"></i>
                  <p className="activity-message">
                    We noticed you are not logged in. As a result, your activity
                    data is not being stored. Please log in to access your activity
                    history and track your progress.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

{/* Confirm Delete Modal */}
{showConfirmDelete && (
  <div className="modal-overlay">
    <div className={`modal-content ${theme}`}>
      <button
        className="close-btn"
        onClick={() => {
          setShowConfirmDelete(false);
          resetCountdown(); // Reset countdown when modal is closed
        }} // Close the modal without deleting
      >
        &times;
      </button>
      <h3 className="final-message">
        Are you sure you want to delete all your Search History?
      </h3>
      <div className="modal-actions">
        <button
          className="confirm-delete-btn"
          onClick={() => {
            if (isOkEnabled) {
              deleteAllPrompts(); // Delete prompts on confirmation
              setShowConfirmDelete(false); // Close the confirmation modal
            }
          }}
          disabled={!isOkEnabled} // Disable button until countdown reaches 0
          style={{
            cursor: isOkEnabled ? "pointer" : "not-allowed", 
             // Change cursor style based on button state
          }}
        >
          {isOkEnabled ? "OK" : `OK(${count})`} {/* Button text changes when countdown reaches 0 */}
        </button>
        <button
          className="cancel-delete-btn"
          onClick={() => {
            setShowConfirmDelete(false);
            resetCountdown(); // Reset countdown when cancel is clicked
          }} // Close the modal without deleting
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}





        {/* Edit Modal */}
        {editingPromptIndex !== null && (
          <div className="modal-overlay">
            <div className={`modal-content ${theme}`}>
              <button
                className="close-btn"
                onClick={() => setEditingPromptIndex(null)}
              >
                &times;
              </button>
              <h2 className="promptEditHeader">
                <FaEdit className="editbtnPrompt" />
                Edit Prompt
              </h2>
              <textarea className="editText"
                value={newPromptText}
                onChange={handleEditChange}
                rows="4"
                cols="50"
              />
              <div className="modal-actions">
                <button className="save" onClick={saveEdit}>
                  Save
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {currentModal === "settings" && (
          <div className="modal-overlay">
            <div className={`modal-content ${theme}`}>
              <button
                className="close-btn"
                onClick={() => setCurrentModal(null)}
              >
                &times;
              </button>
              <h2 className="promptEditHeader">
                <FaGears className="settings" />
                Settings
              </h2>
              <div className="settings-options">
                <div className="setting-item" onClick={toggleTheme}>
                  <img
                    src={
                      theme === "light"
                        ? assets.dark_icon
                        : assets.light_icon
                    }
                    alt="theme toggle"
                  />
                  <p>Toggle Theme</p>
                </div>
                <div
                  className="setting-item"
                  onClick={() => setCurrentModal("analytics")}
                >
                  <img src={assets.analyst_icon} alt="analytics icon" />
                  <p>View Analytics</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentModal === "analytics" && (
          <AnalyticsModal
            closeModal={() => setCurrentModal("settings")}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
