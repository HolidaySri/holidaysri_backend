const express = require("express");
const router = express.Router();

// import  protected-routes middlewares
const {protectedAgent} = require("../middlewares/authMiddlewares");


//import controllers
const {
    getAgentProfile,
    updateAgentProfile,
    deleteAgentProfile,
    allAgentProfiles,
    resetPassword,
    forgotPassword,

    // getInvoice
} = require("../controllers/agentController");

//suser profile routes

router.route("/agentprofile").get(protectedAgent,getAgentProfile);
router.route("/updateAgentProfile").put(protectedAgent,updateAgentProfile);
router.route("/deleteAgentProfile").delete(protectedAgent,deleteAgentProfile);
router.route("/allAgentProfiles").get(allAgentProfiles);
router.route("/reset-Password/:resetToken").put(protectedAgent, resetPassword);
router.route("/forgotPassword").post(protectedAgent, forgotPassword);


module.exports = router; 