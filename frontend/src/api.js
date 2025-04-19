import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchMeals = () => API.get("/meals");
export const addMeal = (meal) => API.post("/meals", meal);
export const deleteMeals = () => API.delete("/meals");

export default API;
