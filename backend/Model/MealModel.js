const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  day: { type: String, required: true },
  meals: {
    breakfast: { type: String, default: "" },
    snacks: { type: String, default: "" },
    lunch: { type: String, default: "" },
    dinner: { type: String, default: "" },
  },
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealSchema);
