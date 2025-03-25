const express = require("express");
const router = express.Router(); // Import Router

// Import Inventory controller
const InventoryControllers = require("../Controllers/InventoryControllers");

// Define routes
router.get("/", InventoryControllers.getAllInventories);
router.post("/", InventoryControllers.addInventories);
router.get("/:id", InventoryControllers.getById);
router.put("/:id", InventoryControllers.updateInventory);
router.delete("/:id", InventoryControllers.deleteInventory);

// Export the router
module.exports = router;

