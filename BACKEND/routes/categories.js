const router = require("express").Router();
let Category = require("../models/Category");

// Route to add a new category
router.route("/add").post(async (req, res) => {
    const { itemname, quantity, unit, productDetails, refillDate, status, notes } = req.body;

    // Create a new category object
    const newCategory = new Category({
        itemname,
        quantity,
        unit,
        productDetails,
        refillDate,
        status,
        notes // Include notes
    });

    newCategory.save().then(() => {
        res.json("Category added successfully");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});

// Get all categories
router.route("/").get((req, res) => {
    Category.find().then((categories) => {
        res.json(categories);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
    });
});

// Update a category
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { itemname, quantity, unit, productDetails, refillDate, status, notes } = req.body;

    const updateCategory = {
        itemname,
        quantity,
        unit,
        productDetails,
        refillDate,
        status,
        notes // Include notes
    };

    await Category.findByIdAndUpdate(userId, updateCategory, { new: true })
        .then((updatedCategory) => {
            res.status(200).send({ status: "Category Updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error updating category", error: err.message });
        });
});

// Delete a category
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Category.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "Category deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error deleting category", error: err.message });
        });
});

// Get a single category by ID
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await Category.findById(userId)
        .then((category) => {
            res.status(200).send({ status: "Category Fetched", category: category });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error fetching category", error: err.message });
        });
});

module.exports = router;
