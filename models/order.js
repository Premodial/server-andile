// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paid: { type: Boolean, default: false },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
