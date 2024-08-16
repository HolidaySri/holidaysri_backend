const Seller = require("../models/Seller");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//fetch suser profile
exports.getSellerProfile = async (req,res) =>{
    try{
        if(!req.seller) {
            res.status(422).json({
                success:false,
                desc:"Can not find the seller - please check again",

            });
        }else {
            res.status(200).send({
                seller:req.seller,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getSellerProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateSellerProfile = async (req,res) => {
    const {role,name, email,contactNumber,password} = req.body;

    try{
        const newData = {
            role,
            name,
            email,
            contactNumber,
            password
        };

        const updatedSeller = await Seller.findByIdAndUpdate(
            req.seller.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "Seller update successfully",
            updatedSeller,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating Seller profile controller " +error,
        });
    }
};

//delete suser profile
exports.deleteSellerProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.seller._id))
        return res.status(404).send(`No Seller with id: ${req.seller._id}`);

    try {
        await Seller.findByIdAndRemove(req.seller._id);
        const deletedSeller = await DeletedSellerModel.create({
            sellerID:req.seller._id
        });
       
        res.status(200).send({
            success: true,
            desc: "Seller deleted successfully",
            deletedSeller,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Seller Profile controller-" + error,
        });
    }


};


exports.allSellerProfiles =  (req,res) =>{
    
    Seller.find().then((Sellers) => {
        res.json(Sellers)

    }).catch((err) => {
      
    })
    
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({ msg: "seller not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    seller.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    seller.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await seller.save();

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
      to: seller.email,
      subject: "Password reset token",
      text: message,
    });

    return res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    seller.resetPasswordToken = undefined;
    seller.resetPasswordExpire = undefined;
    await seller.save();
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
    const seller = await Seller.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!seller) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    seller.password = req.body.password;
    seller.resetPasswordToken = undefined;
    seller.resetPasswordExpire = undefined;

    await seller.save();

    return res.status(200).json({ success: true, data: "Password updated" });
  } catch (err) {
    return res.status(500).send("Server error");
  }
};