const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController"); 

// Define Routes
router.get("/", groceryController.getAllGroceries);
router.post("/", groceryController.addGrocery);
router.get("/:id", groceryController.getById);
router.put("/:id", groceryController.UpdateGrocery);
router.delete("/:id", groceryController.deleteGrocery);

module.exports = router;

