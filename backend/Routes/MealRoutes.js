const express = require("express");
const router = express.Router();

const Meal = require("../Model/MealModel");
const MealController = require("../Controllers/MealController");

router.get("/",MealController.getAllMeals);
router.post("/",MealController.addMeals);
router.get("/:id",MealController.getById);
router.put("/:id",MealController.updateMeals);
router.delete("/:id",MealController.deleteMeals);


module.exports = router;