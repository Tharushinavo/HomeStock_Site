import axios from 'axios';

const API_URL = 'http://localhost:5000/grocery';

export const getGroceries = async () => axios.get(API_URL);
export const addGrocery = async (grocery) => axios.post(API_URL, grocery);
export const updateGrocery = async (id, updatedData) => axios.put(`${API_URL}/${id}`, updatedData);
export const deleteGrocery = async (id) => axios.delete(`${API_URL}/${id}`);

