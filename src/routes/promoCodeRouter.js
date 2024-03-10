const express = require('express');

const {generatePromoCode,applyPromoCode,saveEarnings,createAdvertisement,createOrder,getOrders} = require ('../controllers/promoCodeController')

const router = express.Router();

//generate promo code
router.post("/generate-promo-code", generatePromoCode);

//apply promo code
router.post("/apply-promo-code", applyPromoCode);

//save earnings
router.post("/save-earnings", saveEarnings);

//create advertisement
router.post("/create-advertisement", createAdvertisement);

//create order
router.post("/create-order", createOrder);

//get orders
router.post("/get-orders", getOrders);

module.exports = router;