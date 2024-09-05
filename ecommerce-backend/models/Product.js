const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: Number,
    category: String,
    brand: String,
    image: String,
    stock_quantity: Number,
    sku: String,
    ratings: {
        average: Number,
        reviews_count: Number
    },
    discount: Number,
    tags: [String],
    dimensions: {
        width: String,
        height: String,
        depth: String,
        weight: String
    },
    availability: String,
    material_type: String,
    shipping_information: {
        options: [String],
        cost: {
            standard: Number
        },
        delivery_times: {
            standard: String
        }
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
