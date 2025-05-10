import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaUtensils, FaCoffee, FaHamburger, FaLeaf, FaSave, FaTimes } from "react-icons/fa";

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

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return <FaCoffee />;
      case "snacks":
        return <FaLeaf />;
      case "lunch":
        return <FaUtensils />;
      case "dinner":
        return <FaHamburger />;
      default:
        return <FaUtensils />;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          <FaUtensils style={{ marginRight: "10px" }} />
          {selectedDay} Meal Plan
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        {Object.keys(meals).map((meal, index) => (
          <div key={index} style={formGroupStyle}>
            <label style={labelStyle}>
              {getMealIcon(meal)}
              {meal.charAt(0).toUpperCase() + meal.slice(1)}
            </label>
            <div style={inputContainerStyle}>
              <input
                type="text"
                name={meal}
                value={meals[meal]}
                onChange={handleChange}
                placeholder={`Enter ${meal} items (comma separated)`}
                style={inputStyle}
              />
            </div>
            {errors[meal] && (
              <p style={errorStyle}>
                <FaTimes style={{ marginRight: "5px" }} />
                {errors[meal]}
              </p>
            )}
          </div>
        ))}

        <div style={buttonContainerStyle}>
          <button type="submit" disabled={loading} style={submitButtonStyle}>
            <FaSave style={{ marginRight: "8px" }} />
            {loading ? "Saving..." : "Save Meal Plan"}
          </button>
          <button type="button" onClick={() => navigate(`/`)} style={cancelButtonStyle}>
            <FaTimes style={{ marginRight: "8px" }} />
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

// Updated Styles
const containerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: "2rem",
  width: "90%",
  maxWidth: "800px",
  margin: "2rem auto",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(45deg, #f3f4f6 0%, #f9fafb 100%)",
};

const headerStyle = {
  borderBottom: "2px solid #e5e7eb",
  marginBottom: "2rem",
  paddingBottom: "1rem",
};

const titleStyle = {
  fontSize: "2rem",
  color: "#1f2937",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const labelStyle = {
  fontSize: "1.1rem",
  color: "#374151",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontWeight: "500",
};

const inputContainerStyle = {
  position: "relative",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "1rem",
  border: "2px solid #e5e7eb",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  backgroundColor: "white",
};

const errorStyle = {
  color: "#ef4444",
  fontSize: "0.875rem",
  display: "flex",
  alignItems: "center",
  marginTop: "0.25rem",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginTop: "2rem",
};

const baseButtonStyle = {
  padding: "12px 24px",
  fontSize: "1rem",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  transition: "all 0.3s ease",
};

const submitButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#10b981",
  color: "white",
  ":hover": {
    backgroundColor: "#059669",
    transform: "translateY(-1px)",
  },
};

const cancelButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#ef4444",
  color: "white",
  ":hover": {
    backgroundColor: "#dc2626",
    transform: "translateY(-1px)",
  },
};

export default MealPlannerForm;
