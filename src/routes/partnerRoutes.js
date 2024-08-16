const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedPartner} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getPartnerProfile,
    updatePartnerProfile,
    deletePartnerProfile,
    allPartnerProfiles,
    resetPassword,
    forgotPassword,

    // getInvoice
} = require("../controllers/partnerController");

//suser profile routes

router.route("/partnerprofile").get(protectedPartner,getPartnerProfile);
router.route("/updatepartnerProfile").put(protectedPartner,updatePartnerProfile);
router.route("/deletepartnerProfile").delete(protectedPartner,deletePartnerProfile);
router.route("/allPartnerProfiles").get(allPartnerProfiles);
router.route("/reset-Password/:resetToken").put(protectedPartner, resetPassword);
router.route("/forgotPassword").post(protectedPartner, forgotPassword);

module.exports = router; 