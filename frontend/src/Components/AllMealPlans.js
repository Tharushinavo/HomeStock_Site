import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";

const AllMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editMeals, setEditMeals] = useState({});

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/meals");
        setMealPlans(response.data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };
    fetchMealPlans();
  }, []);

  const deleteMealPlan = async (id) => {
    try {
      setMealPlans((prev) => prev.filter((plan) => plan._id !== id));
      await axios.delete(`http://localhost:5000/meals/${id}`);
      alert("Meal plan deleted successfully!");
    } catch (error) {
      console.error("Error deleting meal plan:", error.message);
      alert("Failed to delete meal plan.");
    }
  };

  const handleMealChange = (mealType, id, value) => {
    setEditMeals((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [mealType]: value,
      },
    }));
  };

  const startEditing = (plan) => {
    setEditingId(plan._id);
    setEditMeals((prev) => ({
      ...prev,
      [plan._id]: { ...plan.meals }, // Pre-populate with existing meals
    }));
  };

  const saveMealPlan = async (id) => {
    try {
      const updatedMeals = { 
        ...mealPlans.find((plan) => plan._id === id).meals, 
        ...editMeals[id] 
      }; // Merge existing meals with new edits

      await axios.put(`http://localhost:5000/meals/${id}`, { meals: updatedMeals });

      setMealPlans((prev) =>
        prev.map((plan) =>
          plan._id === id ? { ...plan, meals: updatedMeals } : plan
        )
      );

      alert("Meal plan updated successfully!");
      setEditingId(null);
      setEditMeals({});
    } catch (error) {
      console.error("Error updating meal plan:", error.message);
      alert("Failed to update meal plan.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("All Meal Plans", 10, 10);

    let yPosition = 20;
    mealPlans.forEach((plan, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(14);
      doc.text(`${plan.day}`, 10, yPosition);
      doc.setFontSize(12);
      yPosition += 10;
      Object.entries(plan.meals).forEach(([mealType, meal]) => {
        doc.text(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)}: ${meal}`, 10, yPosition);
        yPosition += 10;
      });
      yPosition += 10;
    });

    doc.save("MealPlans.pdf");
  };

  return (
    <div style={pageContainer}>
      <Navbar />
      <div style={contentContainer}>
        <h1 style={headingStyle}>All Meal Plans</h1>
        <button onClick={generatePDF} style={pdfButtonStyle}>Download PDF</button>
        <div style={gridStyle}>
          {mealPlans.map((plan) => (
            <div key={plan._id} style={cardStyle}>
              <h2>{plan.day}</h2>
              {["breakfast", "snacks", "lunch", "dinner"].map((mealType) => (
                <div key={mealType}>
                  <strong>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</strong>
                  {editingId === plan._id ? (
                    <input
                      type="text"
                      value={editMeals[plan._id]?.[mealType] || ""}
                      onChange={(e) => handleMealChange(mealType, plan._id, e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    <p>{plan.meals[mealType]}</p>
                  )}
                </div>
              ))}
              {editingId === plan._id ? (
                <div>
                  <button onClick={() => saveMealPlan(plan._id)} style={saveButtonStyle}>Save</button>
                  <button onClick={() => setEditingId(null)} style={cancelButtonStyle}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => startEditing(plan)} style={editButtonStyle}>Edit</button>
              )}
              <button onClick={() => deleteMealPlan(plan._id)} style={deleteButtonStyle}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const pageContainer = { display: "flex" };
const contentContainer = { marginLeft: "220px", padding: "20px", flexGrow: 1 };
const headingStyle = { fontSize: "2rem", color: "#333" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px", marginTop: "20px" };
const cardStyle = { padding: "15px", background: "#f7f7f7", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" };
const inputStyle = { marginBottom: "10px", padding: "8px", width: "30%", fontSize: "1rem", borderRadius: "5px" };
const editButtonStyle = { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" };
const deleteButtonStyle = { backgroundColor: "red", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" };
const saveButtonStyle = { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" };
const pdfButtonStyle = { backgroundColor: "#686dc2", color: "white", border: "none", padding: "10px 16px", borderRadius: "5px", cursor: "pointer", marginBottom: "10px" };
const cancelButtonStyle = { backgroundColor: "#f44336", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" };

export default AllMealPlans;
