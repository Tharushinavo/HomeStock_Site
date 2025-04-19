import React from "react";
import { Routes, Route } from "react-router-dom";
import MealPlannerForm from "./Components/MealPlannerForm";
import AllMealPlans from "./Components/AllMealPlans";
import WeekdayCards from "./Components/WeekdayCards";


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<WeekdayCards />} />
        <Route path="/meal-planner/:day" element={<MealPlannerForm />} />
        <Route path="/all-meal-plans" element={<AllMealPlans />} />
      </Routes>
    
  );
};

export default App;
