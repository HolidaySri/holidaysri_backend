// models/PromoCode.js
const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  discountPercentage: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }, // Add isActive field
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;
