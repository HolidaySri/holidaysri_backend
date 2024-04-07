const Seller = require("../models/Seller");

const mongoose = require("mongoose");

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