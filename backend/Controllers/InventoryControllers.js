const Inventory = require("../Model/InventoryModel");

// Data display
const getAllInventories = async (req, res) => {
    try {
        const inventories = await Inventory.find();
        if (!inventories) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).json({ inventories });
    } catch (err) {
        console.error("Error fetching inventories:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Data insert
const addInventories = async (req, res) => {
    const { productName, quantity, expiryDate, price } = req.body;

    try {
        const inventory = new Inventory({ productName, quantity, expiryDate, price });
        await inventory.save();
        return res.status(201).json({ inventory });
    } catch (err) {
        console.error("Error adding inventory:", err);
        return res.status(500).json({ message: "Unable to add inventory" });
    }
};

// Get by Id
const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const inventory = await Inventory.findById(id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).json({ inventory });
    } catch (err) {
        console.error("Error fetching inventory:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Update inventory details
const updateInventory = async (req, res) => {
    const id = req.params.id;
    const { productName, quantity, expiryDate, price } = req.body;

    try {
        let inventory = await Inventory.findByIdAndUpdate(id, { productName, quantity, expiryDate, price }, { new: true });
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).json({ inventory });
    } catch (err) {
        console.error("Error updating inventory:", err);
        return res.status(500).json({ message: "Unable to update inventory details" });
    }
};

// Delete inventory details
const deleteInventory = async (req, res) => {
    const id = req.params.id;
    try {
        const inventory = await Inventory.findByIdAndDelete(id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).json({ message: "Inventory deleted successfully", inventory });
    } catch (err) {
        console.error("Error deleting inventory:", err);
        return res.status(500).json({ message: "Unable to delete inventory details" });
    }
};

module.exports = {
    getAllInventories,
    addInventories,
    getById,
    updateInventory,
    deleteInventory,
};
