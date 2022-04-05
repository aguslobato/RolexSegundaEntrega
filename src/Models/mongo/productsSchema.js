const mongoose = require('mongoose');

const collection = 'products';
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    id: Number,
})

module.exports = mongoose.model(collection, schema);