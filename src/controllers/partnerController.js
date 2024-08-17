const Partner = require("../models/Partner");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//fetch suser profile
exports.getPartnerProfile = async (req,res) =>{
    try{
        if(!req.partner) {
            res.status(422).json({
                success:false,
                desc:"Can not find the partner - please check again",

            });
        }else {
            res.status(200).send({
                guide:req.partner,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getPartnerProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updatePartnerProfile = async (req,res) => {
    const { Name, Email, contactNumber, password, location, country } =
      req.body;

    try{
        const newData = {
            Name,
            Email,
            contactNumber,
            password,
            location,
            country
        };

        const updatedPartner = await Partner.findByIdAndUpdate(
            req.partner.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "Partner update successfully",
            updatedPartner,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating partner profile controller " +error,
        });
    }
};

//delete suser profile
exports.deletePartnerProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.guide._id))
        return res.status(404).send(`No partner with id: ${req.partner._id}`);

    try {
        await Partner.findByIdAndRemove(req.partner._id);
        const deletedPartner = await DeletedPartnerModel.create({
            partnerID:req.partner._id
        });
       
        res.status(200).send({
            success: true,
            desc: "partner deleted successfully",
            deletedPartner,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Partner Profile controller-" + error,
        });
    }


};


exports.allPartnerProfiles =  (req,res) =>{
    
    Partner.find().then((Partners) => {
        res.json(Partners)

    }).catch((err) => {
      
    })
    
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const patner = await Partner.findOne({ email });

    if (!patner) {
      return res.status(404).json({ msg: "patner not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    patner.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    patner.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await patner.save();

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
      to: patner.email,
      subject: "Password reset token",
      text: message,
    });

    return res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    patner.resetPasswordToken = undefined;
    patner.resetPasswordExpire = undefined;
    await patner.save();
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
    const patner = await Partner.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!patner) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    patner.password = req.body.password;
    patner.resetPasswordToken = undefined;
    patner.resetPasswordExpire = undefined;

    await patner.save();

    return res.status(200).json({ success: true, data: "Password updated" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};