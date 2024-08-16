const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedGuide} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getGuideProfile,
    updateGuideProfile,
    deleteGuideProfile,
    allGuideProfiles,
    resetPassword,
    forgotPassword,

    // getInvoice
} = require("../controllers/guideController");

//suser profile routes

router.route("/guideprofile").get(protectedGuide,getGuideProfile);
router.route("/updateguideProfile").put(protectedGuide,updateGuideProfile);
router.route("/deleteguideProfile").delete(protectedGuide,deleteGuideProfile);
router.route("/allGuideProfiles").get(allGuideProfiles);
router.route("/reset-Password/:resetToken").put(protectedGuide, resetPassword);
router.route("/forgotPassword").post(protectedGuide, forgotPassword);

module.exports = router; 