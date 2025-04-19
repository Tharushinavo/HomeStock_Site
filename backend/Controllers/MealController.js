const Meal = require("../Model/MealModel");

// Get all meals
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    if (!meals.length) return res.status(404).json({ message: "No meals found" });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals", error });
  }
};

// Get meal by ID
exports.getById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meal", error });
  }
};

// Add a new meal
exports.addMeals = async (req, res) => {
  try {
    const { day, meals } = req.body;
    if (!day || !meals) {
      return res.status(400).json({ message: "Day and meals are required" });
    }

    const newMeal = new Meal({ day, meals });
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(500).json({ message: "Error adding meal", error });
  }
};

// Update a meal
exports.updateMeals = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMeal) return res.status(404).json({ message: "Meal not found" });
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: "Error updating meal", error });
  }
};

// Delete a meal
exports.deleteMeals = async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id); // Use ID, not day
    if (!deletedMeal) return res.status(404).json({ message: "Meal not found" });
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meal", error });
  }
};



