const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedAdmin} = require("../middlewares/authMiddlewares");


//import controllers
const {
  updateAdminProfile,
  deleteAdminProfile,
  home,
  resetPassword,
  forgotPassword,

  // getInvoice
} = require("../controllers/adminController");

//Admin profile routes

router.route("/updateProfile").put(protectedAdmin,updateAdminProfile);
router.route("/deleteProfile").delete(protectedAdmin,deleteAdminProfile);
router.route("/home").get(home);
router.route("/reset-Password/:resetToken").put(protectedAdmin, resetPassword);
router.route("/forgotPassword").post(protectedAdmin, forgotPassword);

module.exports = router; 