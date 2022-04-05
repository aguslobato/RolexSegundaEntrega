const mongoose = require('mongoose');

const collection = 'carts';
const schema = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
    },
    cartCreation_timestamp: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model(collection, schema);