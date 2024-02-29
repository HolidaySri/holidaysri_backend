const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
// const Staff = require("../models/Staff");
const Suser = require("../models/User");

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
      const user = await Suser.findById(decoded.id);
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