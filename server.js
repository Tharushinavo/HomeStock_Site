const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8073;

app.use(cors());
app.use(bodyparser.json());

const URL = process.env.MONGODB_URL;

// Fix: Remove deprecated options
mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connected successfully");
});
   
const categoryRouter = require("./routes/categories.js");

app.use("/category", categoryRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT}`);
});
