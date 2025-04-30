const Grocery = require("../models/groceryModel");
const mongoose = require("mongoose");

// Get All Groceries
exports.getAllGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a Grocery Item
exports.addGrocery = async (req, res) => {
  try {
    const { name, quantity, category } = req.body;

    if (!name || !quantity || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newGrocery = new Grocery({ name, quantity, category });
    await newGrocery.save();
    res.status(201).json(newGrocery);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get Grocery by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const grocery = await Grocery.findById(id);
    if (!grocery) {
      return res.status(404).json({ error: "Grocery item not found" });
    }

    res.json(grocery);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Grocery Details
exports.UpdateGrocery = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedGrocery = await Grocery.findByIdAndUpdate(
      id,
      { name, quantity, category },
      { new: true }
    );

    if (!updatedGrocery) {
      return res.status(404).json({ error: "Unable to update details" });
    }

    res.json(updatedGrocery);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Grocery by ID
exports.deleteGrocery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deletedGrocery = await Grocery.findByIdAndDelete(id);
    if (!deletedGrocery) {
      return res.status(404).json({ error: "Grocery item not found" });
    }

    res.json({ message: "Grocery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

