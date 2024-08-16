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
router.post("/forgotPassword", forgotPassword);
router.put("/reset-Password/:resetToken", resetPassword);


module.exports = router; 