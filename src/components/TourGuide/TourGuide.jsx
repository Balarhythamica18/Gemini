import React, { useState } from "react";
import Joyride from "react-joyride";
import "./TourGuide.css"; // Include the custom CSS for styles and animations

const TourGuide = () => {
  const [isTourActive, setIsTourActive] = useState(true);

  const steps = [
    {
      target: ".menu-icon", // Target the menu icon
      content: "This is the menu. Click here to toggle the sidebar.",
      disableBeacon: true, // Disable the pulse animation on the menu icon
    },
    {
      target: ".new-chat", // Target the new chat button
      content: "Click here to start a new chat.",
    },
    {
      target: ".recent-title", // Target the recent chats section
      content: "Here, you can see your recent chats.",
    },
    {
      target: ".bottom-item:nth-child(1)", // Target the Help section
      content: "Need help? Click here to visit the help section.",
    },
    {
      target: ".bottom-item:nth-child(2)", // Target the Activity button
      content: "Click here to view your activity history.",
    },
    {
      target: ".bottom-item:nth-child(3)", // Target the Settings button
      content: "Manage your settings here.",
    },
    {
      target: ".settings-options", // Target the settings modal
      content: "This is the settings panel. Toggle themes or view analytics.",
    },
    {
      target: ".user-icon, .login-button", // Target the user icon or login button
      content: "Click here to log in or view your profile. Logged-in users will see their initials here.",
    },
    {
      target: ".cards", // Target the suggestion cards
      content: "These are suggestion cards. Click on any card to send a predefined prompt.",
    },
    {
      target: ".search-box", // Target the input box
      content: "Enter your queries or prompts here. Press 'Enter' or click the send icon to send.",
    },
  ];

  return (
    <Joyride
      steps={steps}
      continuous
      showSkipButton
      showBackButton
      showNextButton
      styles={{
        options: {
          zIndex: 5000, // Lower zIndex to allow interaction with elements below
          primaryColor: "#a5b1c2",
          textColor: "#333",
          backgroundColor: "#f1f2f6",
          arrowColor: "#a5b1c2",
          overlayColor: "rgba(0, 0, 0, 0.4)", // Make overlay semi-transparent
        },
        beacon: {
          width: "14px", // Adjust the beacon size
          height: "14px",
          position: "relative", // Position relative to avoid conflicts
          marginLeft:"120%", // Adjust left margin for alignment
          marginTop: "100%", // Center vertically
          zIndex: 9999, // Ensure the beacon stays above other elements
        },
      }}
      run={isTourActive}
      callback={(data) => {
        const { status } = data;
        const finishedStatuses = ["finished", "skipped"];
        if (finishedStatuses.includes(status)) {
          setIsTourActive(false); // Stop the tour after completion or skipping
        }
      }}
    />
  );
};

export default TourGuide;
