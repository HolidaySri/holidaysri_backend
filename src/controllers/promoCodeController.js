const PromoCode = require("../models/promo_code");
const Earning = require("../models/earnings");
const Order = require("../models/Order");
const ArchivedEarn = require("../models/ArchivedEarns");

// Generate promo code
// exports.generatePromoCode = async (req, res) => {
//   try {
//     const { discountPercentage, email } = req.body;
//     const generatedCode = generatePromoCode();

//     // Calculate expiration date (1 year from the code generated date)
//     const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

//     const promoCode = new PromoCode({
//       email,
//       code: generatedCode,
//       discountPercentage,
//       expirationDate,
//     });
//     await promoCode.save();

//     res.status(201).send(promoCode);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

exports.generatePromoCode = async (req, res) => {
  try {
    const { discountPercentage, email } = req.body;

    // Check if a promo code already exists for the provided email
    let promoCode = await PromoCode.findOne({ email });

    // If a promo code exists and hasn't expired, return it
    if (promoCode && promoCode.expirationDate > new Date()) {
      return res.status(200).send(promoCode);
    }

    // If no promo code exists or it has expired, generate a new one
    const generatedCode = generatePromoCode();

    // Calculate expiration date (1 year from the code generated date)
    const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    // If a promo code exists but has expired, update it with a new code and expiration date
    if (promoCode) {
      promoCode.code = generatedCode;
      promoCode.discountPercentage = discountPercentage;
      promoCode.expirationDate = expirationDate;
    } else {
      // If no promo code exists, create a new one
      promoCode = new PromoCode({
        email,
        code: generatedCode,
        discountPercentage,
        expirationDate,
      });
    }

    // Save the promo code (new or updated)
    await promoCode.save();

    res.status(201).send(promoCode);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Apply promo code
exports.applyPromoCode = async (req, res) => {
  try {
    const { promoCode, amount } = req.body; // Accept amount from the request body

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
      amount: amount, 
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

// View all earnings details
exports.viewEarnings = async (req, res) => {
  try {
    const earnings = await Earning.find();
    res.json(earnings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching earnings details", message: err.message });
  }
};

exports.deleteAndSaveEarns = async (req, res) => {
  const { earns } = req.body;

  try {
    if (earns && earns.length > 0) {
      await ArchivedEarn.insertMany(earns);
    }

    const ids = earns.map((earn) => earn._id);
    await Earning.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Records deleted and saved successfully." });
  } catch (error) {
    console.error("Error deleting and saving records:", error);
    res.status(500).json({ message: "An error occurred while processing." });
  }
};

// View all earnings details
exports.viewArchived = async (req, res) => {
  try {
    const archives = await ArchivedEarn.find();
    res.json(archives);
  } catch (err) {
    res.status(500).json({ error: "Error fetching archived earnings details", message: err.message });
  }
};

// Check if promo code already exists
exports.checkExistingPromoCode = async (req, res) => {
  try {
    const { email } = req.query; // Assuming email is passed as a query parameter

    const promoCodeObj = await PromoCode.findOne({ email });

    if (!promoCodeObj) {
      return res.status(404).json({ message: 'No promo code found for this user.' });
    }

    // Send both the promo code and isActive status in the response
    res.status(200).json({
      promoCode: promoCodeObj.code,
      isActive: promoCodeObj.isActive
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
