const Suser = require("../models/User");

const mongoose = require("mongoose");

//fetch suser profile
exports.getUserProfile = async (req,res) =>{
    try{
        if(!req.user) {
            res.status(422).json({
                success:false,
                desc:"Can not find the user - please check again",

            });
        }else {
            res.status(200).send({
                suser:req.user,
            });
        }
    }catch(error) {
        res.status(500).json({
            success:false,
            desc:"Error in getUserProfile controller - "+error,
        });
    }
};

//update cutomer profile
exports.updateUserProfile = async (req,res) => {
    const {name,email,contactNumber,password} = req.body;

    try{
        const newData = {
            name,
            email,
            contactNumber,
            password
        };

        const updatedUser = await Suser.findByIdAndUpdate(
            req.user.id,
            newData,
            {
                new:true,
                upsert:false,
                omitUndefined:true
            }
        );
        res.status(200).send({
            success:true,
            desc: "user update successfully",
            updatedUser,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            desc:"Error in updating user profile controller " +error,
        });
    }
};

//delete suser profile
exports.deleteUserProfile = async(req,res) =>{

    if (!mongoose.Types.ObjectId.isValid(req.user._id))
        return res.status(404).send(`No user with id: ${req.user._id}`);

    try {
        await User.findByIdAndRemove(req.user._id);
        const deletedUser = await DeletedUserModel.create({
            userID:req.user._id
        });
       
        res.status(200).send({
            success: true,
            desc: "user deleted successfully",
            deletedUser,

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            desc: "Error in delete Suser Profile controller-" + error,
        });
    }


};


exports.allProfiles =  (req,res) =>{
    
    Suser.find().then((Susers) => {
        res.json(Susers)

    }).catch((err) => {
      
    })
    
};