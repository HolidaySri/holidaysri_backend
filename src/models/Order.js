// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  promoCode: { type: String, required: true },
  payableAmount: { type: Number, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advertises' }], // Reference to Advertisement model
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
