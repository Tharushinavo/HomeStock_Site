import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/" style={navLinkStyle}>
            <div style={navBoxStyle}>Meal Planner</div>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/all-meal-plans" style={navLinkStyle}>
            <div style={navBoxStyle}>All Meal Plans</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Updated styles for box-like navigation items
const navStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  width: "220px",
  background: "#333",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const navListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const navItemStyle = {
  marginBottom: "20px",
  width: "100%",
  textAlign: "center",
};

const navLinkStyle = {
  textDecoration: "none",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const navBoxStyle = {
  background: "#444",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  padding: "15px",
  borderRadius: "10px",
  width: "80%", // Makes the box fit well inside the navbar
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
};

// Hover effect for a better UI feel
navBoxStyle[":hover"] = {
  background: "#555",
  transform: "scale(1.05)",
};

export default Navbar;
