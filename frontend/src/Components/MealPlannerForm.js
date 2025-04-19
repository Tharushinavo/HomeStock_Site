import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MealPlannerForm = () => {
  const { day: selectedDay } = useParams();
  const navigate = useNavigate();

  const [meals, setMeals] = useState({
    breakfast: "",
    snacks: "",
    lunch: "",
    dinner: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/meals/${selectedDay}`);
        if (response.data) {
          setMeals(response.data.meals);
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error fetching meal plan:", error);
      }
    };

    if (selectedDay) fetchMealPlan();
  }, [selectedDay]);

  const handleChange = (event) => {
    setMeals({ ...meals, [event.target.name]: event.target.value.trimStart() });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(meals).forEach((meal) => {
      if (!meals[meal].trim()) {
        newErrors[meal] = `${meal.charAt(0).toUpperCase() + meal.slice(1)} cannot be empty.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const requestData = { day: selectedDay, meals };

      if (isEditing) {
        await axios.put(`http://localhost:5000/meals/${selectedDay}`, requestData);
      } else {
        await axios.post("http://localhost:5000/meals", requestData);
      }

      alert("Meal plan saved successfully!");
      navigate(`/all-meal-plans`);
    } catch (error) {
      console.error("Error saving meal plan:", error);
      alert("Failed to save meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Meal Planner for {selectedDay}</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        {Object.keys(meals).map((meal, index) => (
          <div key={index} style={formGroupStyle}>
            <label style={labelStyle}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</label>
            <input
              type="text"
              name={meal}
              value={meals[meal]}
              onChange={handleChange}
              placeholder={`Enter ${meal} items`}
              style={inputStyle}
            />
            {errors[meal] && <p style={errorStyle}>{errors[meal]}</p>}
          </div>
        ))}
        <div style={buttonContainerStyle}>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Saving..." : "Save Meal Plan"}
          </button>
          <button type="button" onClick={() => navigate(`/`)} style={buttonStyle}>Close</button>
        </div>
      </form>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#f4f7f6",
  borderRadius: "10px",
  width: "80%",
  margin: "0 auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formGroupStyle = {
  margin: "15px 0",
  width: "80%",
};

const labelStyle = {
  fontSize: "16px",
  marginBottom: "5px",
  display: "inline-block",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginTop: "5px",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
};

export default MealPlannerForm;
