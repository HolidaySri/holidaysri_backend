const Agent = require("../models/Agent");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//fetch suser profile
exports.getAgentProfile = async (req,res) =>{
    try{
        if(!req.agent) {
            res.status(422).json({
                success:false,
                desc:"Can not find the agent - please check again",

            });
        }else {
            res.status(200).send({
                agent:req.agent,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getAgentProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateAgentProfile = async (req,res) => {
    const {subrole,name,nic,passport,email,contactNumber,password,promoCode,country} = req.body;

    try{
        const newData = {
            subrole,
            name,
            nic,
            passport,
            email,
            contactNumber,
            password,
            promoCode,
            country
        };

        const updatedAgent = await Agent.findByIdAndUpdate(
            req.agent.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "Agent update successfully",
            updatedAgent,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating Agent profile controller " +error,
        });
    }
};

//delete suser profile
exports.deleteAgentProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.agent._id))
        return res.status(404).send(`No Agent with id: ${req.agent._id}`);

    try {
        await Agent.findByIdAndRemove(req.agent._id);
        const deletedAgent = await DeletedAgentModel.create({
            agentID:req.agent._id
        });
       
        res.status(200).send({
            success: true,
            desc: "Agent deleted successfully",
            deletedAgent,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Agent Profile controller-" + error,
        });
    }


};


exports.allAgentProfiles =  (req,res) =>{
    
    Agent.find().then((Agents) => {
        res.json(Agents)

    }).catch((err) => {
      
    })
    
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(404).json({ msg: "agent not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    agent.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    agent.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await agent.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: agent.email,
      subject: "Password reset token",
      text: message,
    });

    return res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    agent.resetPasswordToken = undefined;
    agent.resetPasswordExpire = undefined;
    await admin.save();
    return res.status(500).json({ msg: "Email could not be sent" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const agent = await Agent.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!agent) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    agent.password = req.body.password;
    agent.resetPasswordToken = undefined;
    agent.resetPasswordExpire = undefined;

    await agent.save();

    return res.status(200).json({ success: true, data: "Password updated" });
  } catch (err) {
        return res.status(500).send("Server error");
    }

};