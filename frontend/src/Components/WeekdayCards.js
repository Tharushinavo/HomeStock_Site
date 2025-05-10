import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// Add a short description for each day
const weekdayData = [
  {
    day: "Monday",
    color: "#f8d07a",
    icon: "fas fa-utensils",
    desc: "Start your week with a healthy meal!"
  },
  {
    day: "Tuesday",
    color: "#ff9f1c",
    icon: "fas fa-carrot",
    desc: "Add some veggies to your plate."
  },
  {
    day: "Wednesday",
    color: "#70c270",
    icon: "fas fa-apple-alt",
    desc: "Midweek boost with fresh fruits."
  },
  {
    day: "Thursday",
    color: "#8bc34a",
    icon: "fas fa-cheese",
    desc: "Try something cheesy today!"
  },
  {
    day: "Friday",
    color: "#ff5733",
    icon: "fas fa-drumstick-bite",
    desc: "Indulge in your favorite treat."
  },
  {
    day: "Saturday",
    color: "#009688",
    icon: "fas fa-pizza-slice",
    desc: "Time for a weekend pizza party!"
  },
  {
    day: "Sunday",
    color: "#4caf50",
    icon: "fas fa-ice-cream",
    desc: "Relax & enjoy a sweet dessert."
  }
];

const WeekdayCards = () => {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <Navbar />
      <h1 style={headingStyle}>Weekly Meal Planner</h1>
      <div style={cardContainerStyle}>
        {weekdayData.map((item) => (
          <div
            key={item.day}
            style={{
              ...cardStyle,
              backgroundColor: item.color
            }}
            onClick={() => navigate(`/meal-planner/${item.day.toLowerCase()}`)}
            className="weekday-card"
          >
            <div style={iconCircleStyle}>
              <i className={item.icon} style={iconStyle}></i>
            </div>
            <div style={cardTitleStyle}>{item.day}</div>
            <div style={descStyle}>{item.desc}</div>
          </div>
        ))}
      </div>
      {/* Inline style tag for hover effect */}
      <style>
        {`
          .weekday-card {
            transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s;
          }
          .weekday-card:hover {
            transform: translateY(-10px) scale(1.04);
            box-shadow: 0 16px 32px rgba(0,0,0,0.25);
            border: 2px solid #fffbe7;
          }
        `}
      </style>
    </div>
  );
};

// Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  padding: "20px",
  position: "relative"
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 1
};

const headingStyle = {
  textAlign: "center",
  fontSize: "40px",
  fontWeight: "bold",
  color: "white",
  marginBottom: "30px",
  fontFamily: "'Montserrat', sans-serif",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  position: "relative",
  zIndex: 2
};

const cardContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "32px",
  width: "90%",
  maxWidth: "900px",
  marginBottom: "50px",
  position: "relative",
  zIndex: 2
};

const cardStyle = {
  padding: "30px 18px 22px 18px",
  color: "white",
  borderRadius: "18px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "160px",
  width: "100%",
  position: "relative",
  zIndex: 2,
  border: "2px solid transparent"
};

const cardTitleStyle = {
  margin: "16px 0 8px 0",
  fontSize: "22px",
  fontWeight: "bold",
  fontFamily: "'Montserrat', sans-serif",
  letterSpacing: "1px",
  textShadow: "1px 1px 3px rgba(0,0,0,0.09)"
};

const descStyle = {
  fontSize: "15px",
  fontWeight: "500",
  fontFamily: "'Montserrat', sans-serif",
  color: "#fffbe7",
  opacity: 0.88
};

const iconCircleStyle = {
  background: "rgba(255,255,255,0.19)",
  borderRadius: "50%",
  width: "56px",
  height: "56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  boxShadow: "0 2px 6px rgba(0,0,0,0.13)"
};

const iconStyle = {
  fontSize: "28px",
  color: "#fff",
  textShadow: "1px 2px 6px rgba(0,0,0,0.25)"
};

export default WeekdayCards;
