const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    itemname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String,
        enum: ['kg', 'l', 'piece'],
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    refillDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'out of stock', 'discontinued'],
        required: true
    },
    notes: {
        type: String,
        required: false
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
