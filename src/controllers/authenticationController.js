const Admin = require("../models/Admin");
const User = require("../models/User");
const Guide = require("../models/Guide");
const Partner = require("../models/Partner");

exports.registerUser = async (req, res, next) => {
  const { userID, name, email, contactNumber, password } = req.body;

  try {
    const user = await User.create({
      userID,
      name,
      email,
      contactNumber,
      password,
    });
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registersuser" + error,
    });
  }
};

exports.registerAdmin = async (req, res, next) => {
  const { email, phoneno, password } = req.body;

  try {
    const admin = await Admin.create({
      email,
      phoneno,
      password,
    });
    sendToken2(admin, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registersuser" + error,
    });
  }
};

exports.registerGuide = async (req, res, next) => {
  const { role,name, nic, email, contactNumber, password, location } = req.body;

  try {
    const guide = await Guide.create({
      role,
      name,
      nic,
      email,
      contactNumber,
      password,
      location
    });
    sendToken1(guide, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registers guide" + error,
    });
  }
};

exports.registerPartner = async (req, res, next) => {
  const { Name, PartnerID, NICNo, Email, contactNumber, password, location } = req.body;

  try {
    const partner = await Partner.create({
      Name,
      PartnerID,
      NICNo,
      Email,
      contactNumber,
      password,
      location
    });
    sendToken3(partner, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registers partner" + error,
    });
  }
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      desc: "provide email, password and role ",
    });
  }

  try {
    const admin = await Admin.findOne({ email: email }).select("+password");

    if (!admin) {
      res.status(404).json({
        success: false,
        error: "invalid credentials",
      });
    }

    const isMatch = await admin.matchPasswords(password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    } else {
      sendToken2(admin, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.guideLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const guide = await Guide.findOne({ email }).select("+password");

    if (!guide) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await guide.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken1(guide, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.partnerLogin = async (req, res, next) => {
  const { Email, password } = req.body;

  if (!Email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Provide email and password",
    });
  }

  try {
    const partner = await Partner.findOne({ Email }).select("+password");

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await partner.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials, please try again",
      });
    }

    sendToken3(partner, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, user });
};

const sendToken1 = (guide, statusCode, res) => {
  const token = guide.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, guide });
};

const sendToken2 = (admin, statusCode, res) => {
  const token = admin.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, admin });
};

const sendToken3 = (partner, statusCode, res) => {
  const token = partner.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, partner });
};