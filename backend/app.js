const express = require("express");
const mongoose = require("mongoose");
const Routes = require("./Routes/InventoryRoutes"); // Correct path

const app = express();

// Middleware
app.use(express.json()); // Needed to parse JSON request bodies
app.use("/inventories", Routes);

// Change port to 5001 if 5000 is in use
const PORT = process.env.PORT || 5005;



// Connect to MongoDB
mongoose
  .connect("mongodb+srv://admin:h8WNWvj9au4JM9lH@cluster0.a2q8y.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

