const PromoCode = require("../models/promo_code");
const Earning = require("../models/earnings")
const Order = require("../models/Order")

//promo code 
exports.generatePromoCode = async (req, res) => {
    try {
      const { discountPercentage } = req.body;
      const { userName } = req.body;
  
      const generatedCode = generatePromoCode();
      
      // Calculate expiration date (2 weeks from the code generated date)
      const expirationDate = new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000);
  
      const promoCode = new PromoCode({
        userName,
        code: generatedCode,
        discountPercentage,
        expirationDate,
      });
      await promoCode.save();
  
      res.status(201).send(promoCode);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

exports.applyPromoCode = async (req, res) => {
    try {
      const { promoCode } = req.body;
  
      const promoCodeObj = await PromoCode.findOne({ code: promoCode });
  
      if (!promoCodeObj) {
        return res.status(404).json({ error: 'Invalid promo code' });
      }
  
      // Check for expiration
      if (promoCodeObj.expirationDate < new Date()) {
        return res.status(403).json({ error: 'Promo code has expired' });
      }
  
      // Retrieve the username and discount percentage
      const userName = promoCodeObj.userName;
      const discountPercentage = promoCodeObj.discountPercentage;
  
      // Track earnings
      const earning = new Earning({
        userName,
        amount: 200,
        promoCode,
      });
  
      // Save earnings to the second database
      await earning.save();
  
      res.status(200).json({ userName, discountPercentage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

exports.saveEarnings = async (req, res) => {
    try {
      const { userName, amount, promoCode } = req.body;
  
      // Assuming you have a validation logic here
  
      const earning = new Earning({
        userName,
        amount,
        promoCode,
      });
  
      // Save earnings to the second database
      await earning.save();
  
      res.status(200).json({ message: 'Earnings saved successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// exports.createAdvertisement = async (req, res) => {
//     try {
//       const { name, variety, amount, picture, information } = req.body;
  
//       // Validate the request data as needed
  
//       const advertisement = new Advertisement({ name, variety, amount, picture, information });
//       await advertisement.save();
  
//       res.status(201).send(advertisement);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }

exports.createOrder = async (req, res) => {
    try {
      const { userName, totalAmount, promoCode, payableAmount, items } = req.body;
  
      const order = new Order({ userName, totalAmount, promoCode, payableAmount, items });
      await order.save();
  
      res.status(201).send(order);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

exports.getOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('items');
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


function generatePromoCode() {
    const length = 8; // You can adjust the length as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }
  

