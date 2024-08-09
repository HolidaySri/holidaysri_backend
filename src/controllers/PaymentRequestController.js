const Payment = require("../models/PaymentRequest");
const Backup = require("../models/Backup");

// add new booking for system
exports.addNewPayment = async (req, res) => {
  const { email, amount, date, accNumber, bank, branch } = req.body;

  Payment.findOne({ email: email })
    .then((savedPayment) => {
      const newPayment = new Payment({
        email,
          amount,
          date,
          accNumber,
          bank,
          branch,
      });

      newPayment.save().then(() => {
        res.json("New Payment Request Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding payment request", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding payment request", message: err.message });
    });
};

// delete existing one
exports.deletePayment = async (req, res) => {
  let paymentId = req.params.id;

  try {
    const paymentToDelete = await Payment.findById(paymentId);

    if (!paymentToDelete) {
      return res.status(404).json({ status: "Payment not found" });
    }

    const Data = [
      `email: ${paymentToDelete.email}`,
      `amount: ${paymentToDelete.amount}`,
      `date: ${paymentToDelete.date}`,
      `accNumber: ${paymentToDelete.accNumber}`,
      `bank: ${paymentToDelete.bank}`,
      `branch: ${paymentToDelete.branch}`
    ];

    const deletedPayment = new Backup({
      Data,
      originalModel: "Payment Request"
    });

    await deletedPayment.save();
    await Payment.findByIdAndDelete(paymentId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// update 
exports.updatePayment = async (req, res) => {
  let paymentId = req.params.id;
  const { email, amount, date, accNumber, bank, branch } = req.body;
  const updatePayment = {
    email,
          amount,
          date,
          accNumber,
          bank,
          branch,
  };

  Payment.findByIdAndUpdate(paymentId, updatePayment)
    .then(() => {
      res.status(200).send({ status: "Payment Request details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// view 
exports.viewPayments= async (req, res) => {
  Payment.find().then((payments) => {
    res.json(payments);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching payments", message: err.message });
  });
};

// view one
exports.viewOnePayment = async (req, res) => {
  let paymentId = req.params.id;

  Payment.findById(paymentId)
    .then((paymentDetails) => {
      if (!paymentDetails) {
        return res.status(404).send({ status: "Payment not found" });
      }
      res.status(200).send({ status: "Payment fetched", paymentDetails });
    }).catch((err) => {
      res.status(500).send({ status: "Error with get", error: err.message });
    });
};
