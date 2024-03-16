const Partner = require("../models/Partner");

const mongoose = require("mongoose");

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
    const {Name,Email,contactNumber,password, location} = req.body;

    try{
        const newData = {
            Name,
            Email,
            contactNumber,
            password,
            location
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