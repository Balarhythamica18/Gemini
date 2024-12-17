import React, { useState } from "react";
import Joyride from "react-joyride";

const TourGuide = () => {
  const [isTourActive, setIsTourActive] = useState(true);

  const steps = [
    // Sidebar Steps
    {
      target: ".menu-icon", // Target the menu icon
      content: "This is the menu. Click here to toggle the sidebar.",
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

    // Main Component Steps
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
      showProgress={false} // Disable the progress indicator (Step 1 of 10)
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#a5b1c2", 
          textColor: "#333", // Dark text color for clarity
          backgroundColor: "#f1f2f6", // White background for good contrast
          arrowColor: "#a5b1c2", // Match arrow color with primary color
          overlayColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for focus
          beaconColor: "#4CAF50", // Beacon color matches the theme
          tooltipColor: "#FFFFFF", // Tooltip color for clarity
          tooltipTextColor: "#333", // Tooltip text in dark color for readability
          // Responsive styles
          tooltipContainer: {
            maxWidth: "90%", // Limit width for mobile screens
            padding: "10px",
            fontSize: "1rem",
          },
          beacon: {
            width: "16px", // Adjust size for smaller screens
            height: "16px",
          },
        },
        // Responsive positioning adjustments
        responsive: {
          large: {
            tooltip: {
              fontSize: "1.1rem",
            },
          },
          medium: {
            tooltip: {
              fontSize: "1rem",
            },
          },
          small: {
            tooltip: {
              fontSize: "0.9rem",
            },
          },
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
