const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedUser} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    allProfiles,
    resetPassword,
    forgotPassword,

    // getInvoice
} = require("../controllers/userController");

//suser profile routes

router.route("/profile").get(protectedUser,getUserProfile);
router.route("/updateProfile").put(protectedUser,updateUserProfile);
router.route("/deleteProfile").delete(protectedUser,deleteUserProfile);
router.route("/allProfiles").get(allProfiles);
router.route("/reset-Password/:resetToken").put(protectedUser,resetPassword);
router.route("/forgotPassword").post(protectedUser, forgotPassword);

module.exports = router; 