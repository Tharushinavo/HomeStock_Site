import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { jsPDF } from "jspdf";

const mealIcons = {
  breakfast: "fas fa-coffee",
  snacks: "fas fa-apple-alt",
  lunch: "fas fa-utensils",
  dinner: "fas fa-drumstick-bite"
};

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
      [plan._id]: { ...plan.meals },
    }));
  };

  const saveMealPlan = async (id) => {
    try {
      const updatedMeals = { 
        ...mealPlans.find((plan) => plan._id === id).meals, 
        ...editMeals[id] 
      };

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

  // -------- PDF TEMPLATE MODIFIED BELOW -----------
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Weekly Meal Plans", 105, 18, { align: "center" });
    doc.setFontSize(12);
    let yPosition = 30;

    mealPlans.forEach((plan, index) => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
      // Day Title
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text(`${plan.day}`, 14, yPosition);
      yPosition += 8;

      // Meals
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      ["breakfast", "snacks", "lunch", "dinner"].forEach((mealType) => {
        const meal = plan.meals[mealType] || "";
        doc.text(
          `${mealType.charAt(0).toUpperCase() + mealType.slice(1)}: `,
          18,
          yPosition
        );
        doc.text(`${meal}`, 50, yPosition);
        yPosition += 7;
      });

      // Divider
      yPosition += 2;
      doc.setDrawColor(200, 200, 200);
      doc.line(14, yPosition, 196, yPosition);
      yPosition += 10;
    });

    doc.save("MealPlans.pdf");
  };
  // -------- END PDF TEMPLATE MODIFIED -----------

  return (
    <div style={pageContainer}>
      <div style={overlayStyle}></div>
      <Navbar />
      <div style={contentContainer}>
        <h1 style={headingStyle}>
          <i className="fas fa-utensils" style={{ marginRight: "15px" }}></i>
          All Meal Plans
        </h1>
        <button onClick={generatePDF} style={pdfButtonStyle}>
          <i className="fas fa-file-download" style={{ marginRight: "8px" }}></i>
          Download PDF
        </button>
        <div style={gridStyle}>
          {mealPlans.map((plan) => (
            <div key={plan._id} style={cardStyle}>
              <h2 style={dayHeaderStyle}>
                <i className="fas fa-calendar-day" style={{ marginRight: "10px", color: "#f39c12" }}></i>
                {plan.day}
              </h2>
              {["breakfast", "snacks", "lunch", "dinner"].map((mealType) => (
                <div key={mealType} style={mealItemStyle}>
                  <div style={mealHeaderStyle}>
                    <i className={mealIcons[mealType]} style={{ marginRight: "8px", color: "#e67e22" }}></i>
                    <strong>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</strong>
                  </div>
                  {editingId === plan._id ? (
                    <input
                      type="text"
                      value={editMeals[plan._id]?.[mealType] || ""}
                      onChange={(e) => handleMealChange(mealType, plan._id, e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    <p style={mealTextStyle}>{plan.meals[mealType]}</p>
                  )}
                </div>
              ))}
              <div style={buttonContainerStyle}>
                {editingId === plan._id ? (
                  <>
                    <button onClick={() => saveMealPlan(plan._id)} style={saveButtonStyle}>
                      <i className="fas fa-check"></i> Save
                    </button>
                    <button onClick={() => setEditingId(null)} style={cancelButtonStyle}>
                      <i className="fas fa-times"></i> Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => startEditing(plan)} style={editButtonStyle}>
                    <i className="fas fa-edit"></i> Edit
                  </button>
                )}
                <button onClick={() => deleteMealPlan(plan._id)} style={deleteButtonStyle}>
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles (unchanged)
const pageContainer = { 
  display: "flex",
  minHeight: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  position: "relative"
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.65)",
  zIndex: 1
};

const contentContainer = { 
  marginLeft: "220px", 
  padding: "30px", 
  flexGrow: 1,
  position: "relative",
  zIndex: 2
};

const headingStyle = { 
  fontSize: "2.5rem",
  color: "#fff",
  fontFamily: "'Montserrat', sans-serif",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  marginBottom: "30px"
};

const gridStyle = { 
  display: "grid", 
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
  gap: "25px", 
  marginTop: "20px" 
};

const cardStyle = { 
  padding: "25px",
  background: "rgba(255, 255, 255, 0.95)",
  borderRadius: "15px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
  backdropFilter: "blur(10px)",
  transition: "transform 0.3s ease, box-shadow 0.3s",
  fontFamily: "'Montserrat', sans-serif"
};

const dayHeaderStyle = {
  color: "#2c3e50",
  fontFamily: "'Montserrat', sans-serif",
  borderBottom: "2px solid #eee",
  paddingBottom: "12px",
  marginBottom: "20px",
  fontSize: "1.3rem"
};

const mealItemStyle = {
  marginBottom: "18px"
};

const mealHeaderStyle = {
  display: "flex",
  alignItems: "center",
  color: "#e67e22",
  marginBottom: "8px"
};

const mealTextStyle = {
  color: "#34495e",
  margin: 0,
  fontSize: "1rem",
  lineHeight: 1.5
};

const inputStyle = { 
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "1rem",
  marginTop: "5px"
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const baseButtonStyle = {
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: "1rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.09)",
  transition: "background 0.2s"
};

const editButtonStyle = { 
  ...baseButtonStyle,
  backgroundColor: "#3498db",
  color: "white"
};

const deleteButtonStyle = { 
  ...baseButtonStyle,
  backgroundColor: "#e74c3c",
  color: "white"
};

const saveButtonStyle = { 
  ...baseButtonStyle,
  backgroundColor: "#2ecc71",
  color: "white"
};

const cancelButtonStyle = { 
  ...baseButtonStyle,
  backgroundColor: "#95a5a6",
  color: "white"
};

const pdfButtonStyle = { 
  ...baseButtonStyle,
  backgroundColor: "#9b59b6",
  color: "white",
  marginBottom: "16px"
};

export default AllMealPlans;
