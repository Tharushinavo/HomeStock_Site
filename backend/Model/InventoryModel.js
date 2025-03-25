const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    productName: {
        type: String, //Data type
        required: true, //Validate
        trim: true,  // Removes extra spaces
      },
      quantity: {
        type: Number, //Data type
        required: true, //Validate
        min: 0,  // Prevents negative quantities
      },
      expiryDate: {
        type: Date, //Data type
        required: true, //Validate
      },
      price: {
        type: Number, //Data type
        required: true, //Validate
        min: 0,  // Prevents negative prices
      }
});

module.exports = mongoose.model(
    "InventoryModel", //File name
    inventorySchema // Function name
)