const vehicleDetails = require("../models/Vehicle");

//add new Vehicle for system
exports.addNewVehicle= async (req, res) => {
 
    //constant variables for the attributes
    const {vehicleNumber,
      Vehiclecategory,
      contactNumber,
      price,
      nic,
      gender,
      expDate,
      description,
      images,
      location,
      promoCode
     } = req.body;
  
  
    vehicleDetails.findOne({vehicleNumber: vehicleNumber})
      .then((savedVehicle) => {
          if(savedVehicle) {
              return res.status(422).json({error:"Vehicle already exists with that no"})
          }
  
          const newVehicle = new vehicleDetails({
            vehicleNumber,
            Vehiclecategory,
            contactNumber,
            price,
            nic,
            gender,
            expDate,
            description,
            images,
            location,
            promoCode
           
        })
    
        newVehicle.save().then(() => {
             res.json("Vehicle Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }

//delete existing one
exports.deleteVehicle = async (req, res) => {
    let vehicleNumber = req.params.id;
   
    await vehicleDetails.findByIdAndDelete(vehicleNumber).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateVehicle= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {vehicleNumber,
            Vehiclecategory,
            contactNumber,
            price,
            nic,
            gender,
            expDate,
            description,
            images,
            location,
            promoCode
           } = req.body;
  
    const updateVehicle = {
      vehicleNumber,
      Vehiclecategory,
      contactNumber,
      price,
      nic,
      gender,
      expDate,
      description,
      images,
      location,
      promoCode }
  
  
    const update = await vehicleDetails.findByIdAndUpdate(id, updateVehicle).then(() => {
      res.status(200).send({status: "Result updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
  }

//view 
exports.viewVehicle= async (req, res) => { 
 
    //calling  model
    vehicleDetails.find().then((vehicles) => {
      res.json(vehicles)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneVehicle = async (req, res) => {
    
    let vehicleNumber = req.params.id;
    const vehicle = await vehicleDetails.findById(vehicleNumber).then((vehicle) => {
        res.status(200).send({status: "  fetched", vehicleNumber})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }