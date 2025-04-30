import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Grocerylist.css";

const GroceryList = () => {
  // manage the list of groceries persisted in local storage
  const [groceries, setGroceries] = useState(() => {
    const savedData = localStorage.getItem("groceries");
    return savedData ? JSON.parse(savedData) : [];
  });

  
  const [newItem, setNewItem] = useState({ name: "", category: "Fruits", quantity: "" });

  
  const [searchTerm, setSearchTerm] = useState("");

  
  const [selectedItems, setSelectedItems] = useState([]);

  
  const [editIndex, setEditIndex] = useState(null);

  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // update local storage when groceries change
  useEffect(() => {
    localStorage.setItem("groceries", JSON.stringify(groceries));
  }, [groceries]);

  // input changes for new item
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Validation function 
  const validateItem = () => {
   
    if (!newItem.name.trim()) {
      setErrorMessage("Item name cannot be empty.");
      return false;
    }

    
    if (!newItem.quantity || isNaN(newItem.quantity) || newItem.quantity <= 0) {
      setErrorMessage("Quantity must be a positive number.");
      return false;
    }

    
    if (groceries.some((item, index) => item.name.toLowerCase() === newItem.name.toLowerCase() && index !== editIndex)) {
      setErrorMessage("This item is already in the list.");
      return false;
    }

    
    setErrorMessage("");
    return true;
  };

  // Add or update item in the grocery list
  const addItem = () => {
    
    if (!validateItem()) return;

    if (editIndex !== null) {
      // Update  item in the list
      const updatedGroceries = [...groceries];
      updatedGroceries[editIndex] = newItem;
      setGroceries(updatedGroceries);
      setEditIndex(null);
      setSuccessMessage("Item updated successfully!");
    } else {
      // Add new item to the list
      setGroceries([...groceries, newItem]);
      setSuccessMessage("Item added successfully!");
    }

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);

    // Reset input fields after adding/updating
    setNewItem({ name: "", category: "Fruits", quantity: "" });
  };

  // updating  item
  const handleUpdate = (index) => {
    setNewItem(groceries[index]); 
    setEditIndex(index); 
  };

  // selecting/unselecting items for delete
  const handleSelectItem = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Deletes selected items from the list
  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) {
      setErrorMessage("Please select items to delete.");
      return;
    }

    // Remove selected items from the list
    setGroceries(groceries.filter((_, index) => !selectedItems.includes(index)));
    setSelectedItems([]); 
    setSuccessMessage("Item(s) deleted successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Sorts the grocery list alphabetically by name
  const sortGroceries = () => {
    setGroceries([...groceries].sort((a, b) => a.name.localeCompare(b.name)));
  };

  // Generates a PDF file of the grocery list
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Grocery List", 10, 10);
    autoTable(doc, {
      head: [["Name", "Category", "Quantity"]],
      body: groceries.map((item) => [item.name, item.category, item.quantity]),
    });
    doc.save("GroceryList.pdf");
  };

  return (
    <div className="grocery-container">
      <h2>Grocery Todo List</h2>

      {/* Display success and error messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Input fields for adding/updating an item */}
      <div className="input-group">
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          placeholder="Enter item name"
        />
        <select name="category" value={newItem.category} onChange={handleChange}>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Snacks">Snacks</option>
          <option value="Bakery">Bakery</option>
          <option value="House Hold">House Hold</option>
          <option value="Grocery">Grocery</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="quantity"
          value={newItem.quantity}
          onChange={handleChange}
          placeholder="Quantity"
        />
        <button onClick={addItem}>{editIndex !== null ? "Update Item" : "Add Item"}</button>
      </div>

      {/* Search and sort functionality */}
      <input
        type="text"
        placeholder="Search groceries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={sortGroceries} className="sort-btn">Sort (A-Z)</button>

      {/* Table displaying grocery items */}
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groceries
            .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => handleSelectItem(index)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => handleUpdate(index)}>Update</button>
                  <button onClick={deleteSelectedItems}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Button to generate a PDF of the grocery list */}
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default GroceryList;




