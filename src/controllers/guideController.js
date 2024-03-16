const Guide = require("../models/Guide");

const mongoose = require("mongoose");

//fetch suser profile
exports.getGuideProfile = async (req,res) =>{
    try{
        if(!req.guide) {
            res.status(422).json({
                success:false,
                desc:"Can not find the guide - please check again",

            });
        }else {
            res.status(200).send({
                guide:req.guide,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getGuideProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateGuideProfile = async (req,res) => {
    const {Name,Email,contactNumber,password, description} = req.body;

    try{
        const newData = {
            Name,
            Email,
            contactNumber,
            password,
            description
        };

        const updatedGuide = await Guide.findByIdAndUpdate(
            req.guide.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "Guide update successfully",
            updatedGuide,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating guide profile controller " +error,
        });
    }
};

//delete suser profile
exports.deleteGuideProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.guide._id))
        return res.status(404).send(`No user with id: ${req.guide._id}`);

    try {
        await Guide.findByIdAndRemove(req.guide._id);
        const deletedGuide = await DeletedGuideModel.create({
            guideID:req.guide._id
        });
       
        res.status(200).send({
            success: true,
            desc: "guide deleted successfully",
            deletedUser,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Guide Profile controller-" + error,
        });
    }


};


exports.allGuideProfiles =  (req,res) =>{
    
    Guide.find().then((Guides) => {
        res.json(Guides)

    }).catch((err) => {
      
    })
    
};