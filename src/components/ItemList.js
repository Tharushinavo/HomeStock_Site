import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ItemList = () => {
    const [categories, setCategories] = useState([]);
    const [editableCategory, setEditableCategory] = useState(null);
    const [formData, setFormData] = useState({
        itemname: "",
        quantity: "",
        unit: "",
        productDetails: "",
        refillDate: "",
        status: "",
        notes: ""
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8070/category");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.itemname.trim()) newErrors.itemname = "Item name is required.";
        if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) newErrors.quantity = "Quantity must be a positive number.";
        if (!formData.unit.trim()) newErrors.unit = "Unit is required.";
        if (!formData.productDetails.trim()) newErrors.productDetails = "Product details are required.";
        if (!formData.refillDate) newErrors.refillDate = "Refill date is required.";
        if (!formData.status.trim()) newErrors.status = "Status is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateCategory = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await axios.put(`http://localhost:8070/category/update/${editableCategory}`, formData);
            setCategories(categories.map(cat => (cat._id === editableCategory ? { ...cat, ...formData } : cat)));
            alert("Category updated successfully");
            setEditableCategory(null);
            setFormData({
                itemname: "",
                quantity: "",
                unit: "",
                productDetails: "",
                refillDate: "",
                status: "",
                notes: ""
            });
        } catch (error) {
            console.error("Error updating category:", error);
            alert("Failed to update category: " + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div>
            <h2>Category Management</h2>
            <input
                type="text"
                placeholder="Search by Item Name or Status"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {editableCategory && (
                <div>
                    <h3>Edit Category</h3>
                    <form onSubmit={updateCategory}>
                        <input type="text" name="itemname" value={formData.itemname} onChange={handleChange} placeholder="Item Name" required />
                        {errors.itemname && <p className="error">{errors.itemname}</p>}
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
                        {errors.quantity && <p className="error">{errors.quantity}</p>}
                        <input type="text" name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit" required />
                        {errors.unit && <p className="error">{errors.unit}</p>}
                        <input type="text" name="productDetails" value={formData.productDetails} onChange={handleChange} placeholder="Product Details" required />
                        {errors.productDetails && <p className="error">{errors.productDetails}</p>}
                        <input type="date" name="refillDate" value={formData.refillDate} onChange={handleChange} required />
                        {errors.refillDate && <p className="error">{errors.refillDate}</p>}
                        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
                        {errors.status && <p className="error">{errors.status}</p>}
                        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes"></textarea>
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ItemList;
