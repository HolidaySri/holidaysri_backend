const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedSeller} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getSellerProfile,
    updateSellerProfile,
    deleteSellerProfile,
    allSellerProfiles,

    // getInvoice
} = require("../controllers/sellerController");

//suser profile routes

router.route("/sellerprofile").get(protectedSeller,getSellerProfile);
router.route("/updateSellerProfile").put(protectedSeller,updateSellerProfile);
router.route("/deleteSellerProfile").delete(protectedSeller,deleteSellerProfile);
router.route("/allSellerProfiles").get(allSellerProfiles);

module.exports = router; 