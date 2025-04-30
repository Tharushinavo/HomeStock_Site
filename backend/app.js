const express = require("express");
const mongoose = require("mongoose");
const groceryRoutes = require("./routes/groceryRoutes"); // Ensure it's lowercase

const app = express();

// Middleware
app.use(express.json()); 

// Routes
app.use("/grocery", groceryRoutes);


const MONGO_URI = "mongodb+srv://Nethasha:Nethasha2002@cluster0.n5ldb.mongodb.net/groceryDB";

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); 
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
