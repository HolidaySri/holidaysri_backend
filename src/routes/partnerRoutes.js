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

    // getInvoice
} = require("../controllers/partnerController");

//suser profile routes

router.route("/partnerprofile").get(protectedPartner,getPartnerProfile);
router.route("/updatepartnerProfile").put(protectedPartner,updatePartnerProfile);
router.route("/deletepartnerProfile").delete(protectedPartner,deletePartnerProfile);
router.route("/allPartnerProfiles").get(allPartnerProfiles);

module.exports = router; 