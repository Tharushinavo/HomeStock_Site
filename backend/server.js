const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MealPlan = require("./models/MealPlan");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mealplans", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all meal plans
app.get("/meals", async (req, res) => {
  const meals = await MealPlan.find();
  res.json(meals);
});

// Add a new meal plan
app.post("/meals", async (req, res) => {
  const { day, meals } = req.body;
  const newMeal = new MealPlan({ day, meals });
  await newMeal.save();
  res.json({ message: "Meal plan saved!" });
});

// Update a meal plan by ID
app.put("/meals/:id", async (req, res) => {
  const { id } = req.params;
  const { meals } = req.body;
  const updatedMeal = await MealPlan.findByIdAndUpdate(id, { meals }, { new: true });

  if (!updatedMeal) return res.status(404).json({ message: "Meal plan not found." });
  res.json({ message: "Meal plan updated!" });
});

// Delete a meal plan by ID
app.delete("/meals/:id", async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(204).send();
  });
  
  
  
