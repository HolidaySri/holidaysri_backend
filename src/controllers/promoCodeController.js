const PromoCode = require("../models/promo_code");
const Earning = require("../models/earnings");
const Order = require("../models/Order");

// Generate promo code
exports.generatePromoCode = async (req, res) => {
  try {
    const { discountPercentage, email } = req.body;
    const generatedCode = generatePromoCode();

    // Calculate expiration date (1 year from the code generated date)
    const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const promoCode = new PromoCode({
      email,
      code: generatedCode,
      discountPercentage,
      expirationDate,
    });
    await promoCode.save();

    res.status(201).send(promoCode);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Apply promo code
exports.applyPromoCode = async (req, res) => {
  try {
    const { promoCode } = req.body;

    const promoCodeObj = await PromoCode.findOne({ code: promoCode });

    if (!promoCodeObj) {
      return res.status(404).json({ error: 'Invalid promo code' });
    }

    // Check for expiration and active status
    if (promoCodeObj.expirationDate < new Date() || !promoCodeObj.isActive) {
      return res.status(403).json({ error: 'Promo code is expired or inactive' });
    }

    const email = promoCodeObj.email;
    const discountPercentage = promoCodeObj.discountPercentage;

    const earning = new Earning({
      email,
      amount: 200,
      promoCode,
    });

    await earning.save();

    res.status(200).json({ email, discountPercentage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save earnings
exports.saveEarnings = async (req, res) => {
  try {
    const { email, amount, promoCode } = req.body;

    const earning = new Earning({
      email,
      amount,
      promoCode,
    });

    await earning.save();

    res.status(200).json({ message: 'Earnings saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { email, totalAmount, promoCode, payableAmount, items } = req.body;

    const order = new Order({ email, totalAmount, promoCode, payableAmount, items });
    await order.save();

    res.status(201).send(order);
  } catch (error) {
    res.status500.send(error.message);
  }
};

// Get orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Reactivate promo code
exports.reactivatePromoCode = async (req, res) => {
  try {
    const { code, email } = req.body;

    const promoCodeObj = await PromoCode.findOne({ code });

    if (!promoCodeObj) {
      return res.status(404).json({ error: 'Promo code not found' });
    }

    // Check if email is missing and update if provided
    if (!promoCodeObj.email && email) {
      promoCodeObj.email = email;
    }

    // Extend expiration date by one year from now
    promoCodeObj.expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    promoCodeObj.isActive = true; // Reactivate the promo code

    await promoCodeObj.save();

    res.status(200).json({ message: 'Promo code reactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
