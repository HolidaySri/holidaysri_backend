const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.updateAdminProfile = async (req, res) => {
  const { email, phoneno, password } = req.body;

  try {
    const newData = {
      email,
      phoneno,
      password,
    };

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id,
      newData,
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: "admin update successfully",
      updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updating admin profile controller " + error,
    });
  }
};

//delete admin profile
exports.deleteAdminProfile = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.user._id))
    return res.status(404).send(`No Admin with id: ${req.user._id}`);

  try {
    await Admin.findByIdAndRemove(req.user._id); // Corrected from Student to Admin
    const deletedAdmin = await DeletedAdminModel.create({
      email: req.user._id,
    });

    res.status(200).send({
      success: true,
      desc: "admin deleted successfully",
      deletedAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in delete Admin Profile controller-" + error,
    });
  }
};

exports.home = (req, res) => {
  res.status(200).json({
    success: true,
    data: "access granted",
  });
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ msg: "admin not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await admin.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: admin.email,
      subject: "Password reset token",
      text: message,
    });

    return res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;
    await admin.save();
    return res.status(500).json({ msg: "Email could not be sent" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const admin = await Admin.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    return res.status(200).json({ success: true, data: "Password updated" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};