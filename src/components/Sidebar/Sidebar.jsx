import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import AnalyticsModal from "../AnalyticsModal/AnalyticsModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [editingPromptIndex, setEditingPromptIndex] = useState(null);
  const [newPromptText, setNewPromptText] = useState("");
  const [showActivityModal, setShowActivityModal] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    onSent,
    prevPrompt,
    setRecentPrompt,
    newChat,
    toggleAnalytics,
    theme,
    toggleTheme,
    setPrevPrompt,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const deletePrompt = (index) => {
    const updatedPrompts = prevPrompt.filter((_, i) => i !== index);
    setPrevPrompt(updatedPrompts);
  };

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

  return (
    <div className={`sidebar-container ${theme}`}>
      {/* Constant Menu Icon */}
      <div className={`sidebar-container ${theme}`}>
  {/* Constant Menu Icon */}
  <div className={`menu-icon ${theme}`}>
    <img
      onClick={toggleSidebar}
      className={`menu ${theme}`} // Add theme class here
      title="menu"
      src={ (theme === "dark" ? assets.menu_icon_light : assets.menu_icon_dark)}
      alt="menu"
    />
  </div>
</div>


      {/* Sidebar Component */}
      <div className={`sidebar ${isOpen ? "open" : ""} ${theme}`}>
        <div className="top">
          <div className="new-chat">
            <img onClick={newChat} src={assets.plus_icon} alt="new chat" />
            <p title="New Chat">New Chat</p>
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
            
              <p>
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
            onClick={() => setShowActivityModal(true)}
          >
            <img src={assets.history_icon} alt="history icon" />
            <p>Activity</p>
          </div>
          <div
            className="bottom-item recent-entry"
            onClick={() => setCurrentModal("settings")}
          >
            <img src={assets.setting_icon} alt="settings icon" />
             <p>Settings</p>
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
              <h2 className="activity-modal-header">
                <i className="fas fa-exclamation-triangle"></i>
              </h2>
              <p className="activity-message">
                We noticed you are not logged in. As a result, your activity
                data is not being stored. Please log in to access your activity
                history and track your progress.
              </p>
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
              <textarea
                value={newPromptText}
                onChange={handleEditChange}
                rows="4"
                cols="50"
              />
              <div className="modal-actions">
                <button className="save" onClick={saveEdit}>
                  Save
                </button>
                <button
                  className="cancel"
                  onClick={() => setEditingPromptIndex(null)}
                >
                  Cancel
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