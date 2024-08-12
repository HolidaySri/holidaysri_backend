const mongoose = require("mongoose");

const archivedEarnSchema = new mongoose.Schema({
  email: String,
  amount: Number,
  promoCode: String,
  createdAt: Date,
});

const ArchivedEarn = mongoose.model("ArchivedEarn", archivedEarnSchema);

module.exports = ArchivedEarn;
