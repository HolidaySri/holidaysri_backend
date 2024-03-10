// models/earning.js
const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  userName: {
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
