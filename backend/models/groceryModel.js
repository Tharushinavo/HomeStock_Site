const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grocerySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    quantity: {
        type: Number, // Ensure quantity is stored as a number
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"], // Prevent negative values
    }
});

module.exports = mongoose.model("Grocery", grocerySchema);
