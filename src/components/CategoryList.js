import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './CategoryList.css';

const categories = [
    { id: 1, name: "Fruits", image: "/images/fruit1.avif" },
    { id: 6, name: "Snacks", image: "/images/snacks.avif" },
    { id: 5, name: "Vegetables", image: "/images/vegetables.jpg" },
    { id: 4, name: "Meat", image: "/images/meat.avif" },
    { id: 2, name: "Drinks", image: "/images/drinks1.jpg" },
    { id: 3, name: "Dairy", image: "/images/dairy.jpg" },
    { id: 2, name: "Grains", image: "/images/grains.jpg" }
];

const CategoryList = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 1) { // If 'Fruits' category is clicked
            navigate("/add"); // Navigate to the AddFruits page
        }
    };

    return (
        <div className="category-page">
            <h1 className="title">CATEGORIES</h1>
            <div className="category-grid">
                {categories.map(category => (
                    <div 
                        key={category.id} 
                        className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(category.id)} // Handle category click
                    >
                        <img src={category.image} alt={category.name} className="category-image" />
                        <div className="category-name">
                            {category.name} <span className="arrow">&gt;</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
