import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";  // ✅ Fixed Import

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeekdayCards = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <Navbar />
      <h1 style={headingStyle}>Weekly Meal Planner</h1>
      <div style={cardContainerStyle}>
        {weekdays.map((day) => (
          <div 
            key={day} 
            style={cardStyle} 
            onClick={() => navigate(`/meal-planner/${day.toLowerCase()}`)}
          >
            <h2 style={cardTitleStyle}>{day}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};


const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f4f4f4",
  padding: "20px",
};

const headingStyle = { 
  textAlign: "center", 
  fontSize: "40px", 
  fontWeight: "bold", 
  color: "#333",
  marginBottom: "20px" // Added spacing below the heading
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // Increased card size
  gap: "20px", // Increased gap between cards
  width: "80%",
  maxWidth: "700px", 
};

const cardStyle = {
  padding: "30px", 
  background: "#f0cd79",
  color: "white",
  borderRadius: "15px", 
  textAlign: "center",
  fontSize: "30px", 
  fontWeight: "bold",
  cursor: "pointer",
  transition: "transform 0.2s", // Added hover effect
};

const cardTitleStyle = { 
  margin: 0,
  fontSize: "24px" // Increased font size inside the card
};

export default WeekdayCards;
