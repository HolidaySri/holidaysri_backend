const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
// const Staff = require("../models/Staff");
const User = require("../models/User");
const Guide = require("../models/Guide");
const Partner = require("../models/Partner");
const Agent = require("../models/Agent");
const Seller = require("../models/Seller");
exports.protectedAdmin = async (req, res, next) => {
    let token;
    token = tokenValidate(req, res);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Admin.findById(decoded.id);
      if (!user) {
        noUserResponse(res);
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      invalidUserResponse(res, err);
    }
  };

exports.protectedUser = async (req, res, next) => {
    let token;
    token = tokenValidate(req, res);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        noUserResponse(res);
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      invalidUserResponse(res, err);
    }
  };

  exports.protectedGuide = async (req, res, next) => {
    let token;
    token = tokenValidate(req, res);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const guide = await Guide.findById(decoded.id);
      if (!guide) {
        noUserResponse(res);
      } else {
        req.guide = guide;
        next();
      }
    } catch (err) {
      invalidUserResponse(res, err);
    }
  };

  exports.protectedPartner = async (req, res, next) => {
    let token;
    token = tokenValidate(req, res);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const partner = await Partner.findById(decoded.id);
      if (!partner) {
        noUserResponse(res);
      } else {
        req.partner = partner;
        next();
      }
    } catch (err) {
      invalidUserResponse(res, err);
    }
  };


  exports.protectedAgent = async (req, res, next) => {
    let token;
    token = tokenValidate(req, res);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const agent = await Agent.findById(decoded.id);
      if (!agent) {
        noUserResponse(res);
      } else {
        req.agent = agent;
        next();
      }
    } catch (err) {
      invalidUserResponse(res, err);
    }
  };



  exports.protectedSeller = async (req, res, next) => {
    let token;
    token = tokenValidate(req, res);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const seller = await Seller.findById(decoded.id);
      if (!seller) {
        noUserResponse(res);
      } else {
        req.seller = seller;
        next();
      }
    } catch (err) {
      invalidUserResponse(res, err);
    }
  };

  const tokenValidate = (reqObj, res) => {
    let token;
    if (
        reqObj.headers.authorization &&
        reqObj.headers.authorization.startsWith("Bearer")
    ) {
        token = reqObj.headers.authorization.split(" ")[1];
    }
    if (!token) {
        res.status(401).json({ success: false, desc: "Not Authorized to Access" });
    }
    return token;
};
  
  const noUserResponse = (res) => {
    res.status(404).json({ success: false, desc: "No user found with this ID" });
  };
  
  const invalidUserResponse = (res, err) => {
    res
      .status(401)
      .json({ success: false, desc: "Something went wrong, Frobidden-" + err });
  };