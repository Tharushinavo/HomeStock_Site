import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const MealPlannerPage = () => {
  const { day } = useParams();
  const [savedMeals, setSavedMeals] = useState({});
  const [editMeal, setEditMeal] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch meals from the backend when the component loads
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/meals/${day}`);
        if (response.data && response.data.meals) {
          setSavedMeals(response.data.meals);
        } else {
          setSavedMeals({});
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    if (day) fetchMeals();
  }, [day]);

  // 🛠 Delete a meal from the database
  const handleDelete = async (meal) => {
    try {
      await axios.delete(`http://localhost:5000/meals/${day}/${meal}`);
      setSavedMeals((prev) => {
        const updatedMeals = { ...prev };
        delete updatedMeals[meal]; // Properly remove meal
        return updatedMeals;
      });
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  // 🛠 Enable editing mode for a meal
  const handleEdit = (meal) => {
    setEditMeal(meal);
    setEditText(savedMeals[meal] || "");
  };

  // 🛠 Save edited meal name in the database
  const handleSaveEdit = async () => {
    try {
      const updatedMeals = { ...savedMeals, [editMeal]: editText };
      await axios.put(`http://localhost:5000/meals/${day}`, { day, meals: updatedMeals });
      setSavedMeals(updatedMeals);
      setEditMeal(null);
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Meal Plan for {day.charAt(0).toUpperCase() + day.slice(1)}</h1>

      {/* 🛠 Display Saved Meals */}
      {Object.keys(savedMeals).length > 0 ? (
        <div style={mealContainerStyle}>
          {Object.entries(savedMeals).map(([meal, items]) => (
            <div key={meal} style={mealItemStyle}>
              {editMeal === meal ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={inputStyle}
                  />
                  <button style={saveButtonStyle} onClick={handleSaveEdit}>Save</button>
                  <button style={buttonStyle} onClick={() => setEditMeal(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>
                    <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {items || "No food added"}
                  </p>
                  <button style={buttonStyle} onClick={() => handleEdit(meal)}>Update</button>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(meal)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No meal plan saved yet.</p>
      )}

      {/* ✅ MealPlannerForm remains unchanged */}
      {/* <MealPlannerForm selectedDay={day} /> */}
    </div>
  );
};

// 🎨 Styling
const mealContainerStyle = { background: "#f9f9f9", padding: "10px", borderRadius: "5px", marginBottom: "20px" };
const mealItemStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" };
const buttonStyle = { background: "#4A90E2", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" };
const deleteButtonStyle = { background: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" };
const saveButtonStyle = { background: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" };
const inputStyle = { padding: "5px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ccc" };

export default MealPlannerPage;
