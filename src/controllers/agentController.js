const Agent = require("../models/Agent");

const mongoose = require("mongoose");

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
    const {subrole,name,nic,passport,email,contactNumber,password,promoCode} = req.body;

    try{
        const newData = {
            subrole,
            name,
            nic,
            passport,
            email,
            contactNumber,
            password,
            promoCode
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