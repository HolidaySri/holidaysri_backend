const express = require('express');
const { generatePromoCode, applyPromoCode, saveEarnings, createOrder, getOrders, reactivatePromoCode, viewEarnings } = require('../controllers/promoCodeController');

const router = express.Router();

// Generate promo code
router.post("/generate-promo-code", generatePromoCode);

// Apply promo code
router.post("/apply-promo-code", applyPromoCode);

// Save earnings
router.post("/save-earnings", saveEarnings);

// Create order
router.post("/create-order", createOrder);

// Get orders
router.post("/get-orders", getOrders);

// Reactivate promo code
router.post("/reactivate-promo-code", reactivatePromoCode);

// RGet Earnings
router.get("/getearns", viewEarnings);

module.exports = router;
