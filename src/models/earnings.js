// models/earning.js
const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  promoCode: {
    type: String,
    required: true,
  },
});

const Earning = mongoose.model('Earning', earningSchema);

module.exports = Earning;
