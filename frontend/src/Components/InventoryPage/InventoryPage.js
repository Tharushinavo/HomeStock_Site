import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./InventoryPage.css";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    productName: "",
    quantity: "",
    expiryDate: "",
    price: "",
  });

  // Fetch all inventories
  useEffect(() => {
    axios.get("http://localhost:5005/api/inventory")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add inventory
  const addProduct = () => {
    axios.post("http://localhost:5005/api/inventory", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ productName: "", quantity: "", expiryDate: "", price: "" });
      })
      .catch((error) => console.error(error));
  };

  // Delete inventory
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5005/api/inventory/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((error) => console.error(error));
  };

  // Search products
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products alphabetically
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    a.productName.localeCompare(b.productName)
  );

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Inventory Report", 20, 10);
    doc.autoTable({
      head: [["Product Name", "Quantity", "Expiry Date", "Price"]],
      body: sortedProducts.map((product) => [
        product.productName,
        product.quantity,
        new Date(product.expiryDate).toLocaleDateString(), // Format date
        `$${product.price}`,
      ]),
    });
    doc.save("inventory_report.pdf");
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Product Form */}
      <div className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.productName}
          onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <input
          type="date"
          value={newProduct.expiryDate}
          onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* Inventory List */}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
              <td>{new Date(product.expiryDate).toLocaleDateString()}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Generate Report */}
      <button className="generate-report" onClick={generatePDF}>
        Generate Report
      </button>
    </div>
  );
};

export default InventoryPage;
