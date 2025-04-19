const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mealRoutes = require("./Routes/MealRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/meals", mealRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://tharu:tharu2025@cluster0.cmwzl.mongodb.net/meal-planner", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("MongoDB connection error:", err));
