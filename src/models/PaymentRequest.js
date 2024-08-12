// models/payment_request.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  accNumber: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
},  { timestamps: true }); 

const Payment = mongoose.model('Payment Request', paymentSchema);

module.exports = Payment;
