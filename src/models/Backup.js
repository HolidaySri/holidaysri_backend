const mongoose = require("mongoose");

const BackupSchema = new mongoose.Schema({
  Data: { type: Array, required: true },
  originalModel: { type: String, required: true },
  deletedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Backup", BackupSchema);
