const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: String,
    default: "user",
  },
  name: {
    type: String,
    required: true, // Corrected from "require"
  },
  email: {
    type: String,
    unique: true,
    required: true, // Corrected from "require"
  },
  contactNumber: {
    type: Number,
    required: true, // Corrected from "require"
  },
  isSubscribed: {
    type: String,
    default: 'Not subscribed',
  },
  password: {
    type: String,
    required: true, // Corrected from "require"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true // Enable timestamps
});

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
