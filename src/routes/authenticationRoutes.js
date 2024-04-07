const express = require("express");
const router = express.Router();

// import controllers
const {
  registerUser,
  userLogin,
  adminLogin,
  registerAdmin,
  registerGuide,
  guideLogin,
  registerPartner,
  partnerLogin,
  registerAgent,
  agentLogin,
  registerSeller,
  sellerLogin,


  
} = require("../controllers/authenticationController");
 
//register Routes

router.route("/registeruser").post(registerUser);
// router.route("/registerstaff").post(registerStaff);
router.route("/registeradmin").post(registerAdmin);
router.route("/registerguide").post(registerGuide);
router.route("/registerpartner").post(registerPartner);
router.route("/registeragent").post(registerAgent);
router.route("/registerseller").post(registerSeller);

//login routes
router.route("/userlogin").post(userLogin);
// router.route("/stafflogin").post(staffLogin);
router.route("/adminlogin").post(adminLogin);
router.route("/guidelogin").post(guideLogin);
router.route("/partnerlogin").post(partnerLogin);
router.route("/agentlogin").post(agentLogin);
router.route("/sellerlogin").post(sellerLogin);


//router.route("/forgotpassword").post(forgotpassword);

//router.route("/resetpassword/:resetToken").post(resetpassword);

module.exports = router;