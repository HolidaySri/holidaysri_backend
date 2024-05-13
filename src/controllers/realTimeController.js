const realTimeDetails = require("../models/RealTime");

//add new Vehicle for system
exports.addNewRealTime= async (req, res) => {
 
    //constant variables for the attributes
    const {realTimeID,
    vehicleID,
    vehicleOwnerName,
    phoneNumber,
    Route,
    Description,
    Maximum,
    Availability,
    CurrentLocation,
    Status,
     } = req.body;
  
  
    realTimeDetails.findOne({realTimeID: realTimeID})
      .then((savedRealTime) => {
          if(savedRealTime) {
              return res.status(422).json({error:"Vehicle already exists with that no"})
          }
  
          const newRealTime = new realTimeDetails({
            realTimeID,
    vehicleID,
    vehicleOwnerName,
    phoneNumber,
    Route,
    Description,
    Maximum,
    Availability,
    CurrentLocation,
    Status,
           
        })
    
        newRealTime.save().then(() => {
             res.json("RealTime Advertisement Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }

//delete existing one
exports.deleteRealTime = async (req, res) => {
    let realTimeID = req.params.id;
   
    await realTimeDetails.findByIdAndDelete(realTimeID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateRealTime= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {realTimeID,
        vehicleID,
        vehicleOwnerName,
        phoneNumber,
        Route,
        Description,
        Maximum,
        Availability,
        CurrentLocation,
        Status,
           } = req.body;
  
    const updateRealTime = {
        realTimeID,
        vehicleID,
        vehicleOwnerName,
        phoneNumber,
        Route,
        Description,
        Maximum,
        Availability,
        CurrentLocation,
        Status,}
  
  
    const update = await realTimeDetails.findByIdAndUpdate(id, updateRealTime).then(() => {
      res.status(200).send({status: "Result updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
  }

//view 
exports.viewRealTime= async (req, res) => { 
 
    //calling  model
    realTimeDetails.find().then((realTimes) => {
      res.json(realTimes)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneRealTime = async (req, res) => {
    
    let realTimeNumber = req.params.id;
    const realTime = await realTimeDetails.findById(realTimeNumber).then((realTime) => {
        res.status(200).send({status: "  fetched", realTime})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }

exports.viewOneRealTimeByName = async (req, res) => {
    const personName = req.params.vehicleOwnerName; // Assuming the name is passed as a parameter

    try {
        const realTime = await realTimeDetails.findOne({ name: personName });
        if (realTime) {
            res.status(200).json({ status: "success", realTime });
        } else {
            res.status(404).json({ status: "error", message: "Person not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};