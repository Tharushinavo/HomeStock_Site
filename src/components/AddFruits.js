import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./AddFruits.css";

export default function AddFruits() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        itemname: "",
        quantity: "",
        unit: "",
        productDetails: "",
        refillDate: "",
        status: "",
        notes: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setFilteredProducts(
            products.filter(product =>
                String(product.itemname).toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(product.quantity).toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(product.unit).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, products]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8073/category");
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8073/category/add", formData);
            alert("New Product Added Successfully");
            setFormData({
                itemname: "",
                quantity: "",
                unit: "",
                productDetails: "",
                refillDate: "",
                status: "",
                notes: ""
            });
            fetchProducts();
            setFormVisible(false);
        } catch (err) {
            alert(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
        setEditFormVisible(true);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8073/category/update/${editingProduct._id}`, formData);
            alert("Product Updated Successfully");
            fetchProducts();
            setEditingProduct(null);
            setEditFormVisible(false);
        } catch (err) {
            alert("Error updating product");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:8073/category/delete/${id}`);
                alert("Product Deleted Successfully");
                fetchProducts();
            } catch (err) {
                alert("Error deleting product");
            }
        }
    };

    const generatePDF = async () => {
        const input = document.getElementById('driver-table');
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('Product-report.pdf');
    };

    
    return (
        <div className="container">
            <h2>Product List</h2>
            
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <table id="driver-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Product Details</th>
                        <th>Refill Date</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td>{product.itemname}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td>{product.productDetails}</td>
                            <td>{product.refillDate}</td>
                            <td>{product.status}</td>
                            <td>{product.notes}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(product)}type = "btn1">Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(product._id)} type = "btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => setFormVisible(!formVisible)} className="add-button">
                {formVisible ? "Cancel" : "Add Product"}
            </button>

            {formVisible && (
                <form onSubmit={handleAddProduct}>
                    <h2>Add Product</h2>
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <label>{key}</label>
                            <input type="text" name={key} value={formData[key]} onChange={handleInputChange} required />
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            )}

            {editFormVisible && (
                <form onSubmit={handleUpdateProduct}>
                    <h2>Update Product</h2>
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <label>{key}</label>
                            <input type="text" name={key} value={formData[key]} onChange={handleInputChange} required />
                        </div>
                    ))}
                    <button type="submit">Update</button>
                    <button className="cancel-button" onClick={() => setEditFormVisible(false)} type = "btn">Cancel</button>
                </form>
            )}

            <button onClick={generatePDF} className="generate-report-button" type = "btn1">Generate Report</button>
            <button onClick={() => navigate("/charts")} className="analysis-button" type = "btn">Analysis</button>
        </div>
    );
}

