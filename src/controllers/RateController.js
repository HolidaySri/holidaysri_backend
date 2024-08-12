const rateDetails = require("../models/Rates.js");

//add new Vehicle for system
exports.addRate= async (req, res) => {
 
    //constant variables for the attributes
    const {
      rateID,
    discounthotelPercentage,
    discountpackagePercentage,
    discountProductsPercentage,
    discountvehiclePercentage,
    discountagentPercentage,
    discountguidePercentage,
    discountPromoCodePercentage,
    discountLiveRidePercentage,
    discountEventPercentage,
    hotelAdvertiseRate,
    packageAdvertiseRate,
    productsAdvertiseRate,
    vehicleAdvertiseRate,
    agentAdvertiseRate,
    guideAdvertiseRate,
    promoCodeRate,
    liveRideRate,
    eventRate,
    earningRate,
     } = req.body;
  
  
    rateDetails.findOne({rateID: rateID})
      .then((savedRate) => {
          if(savedRate) {
              return res.status(422).json({error:"Vehicle already exists with that no"})
          }
  
          const newRate = new rateDetails({
            rateID,
    discounthotelPercentage,
    discountpackagePercentage,
    discountProductsPercentage,
    discountvehiclePercentage,
    discountagentPercentage,
    discountguidePercentage,
    discountPromoCodePercentage,
    discountLiveRidePercentage,
    discountEventPercentage,
    hotelAdvertiseRate,
    packageAdvertiseRate,
    productsAdvertiseRate,
    vehicleAdvertiseRate,
    agentAdvertiseRate,
    guideAdvertiseRate,
    promoCodeRate,
    liveRideRate,
    eventRate,
    earningRate,
        })
    
        newRate.save().then(() => {
             res.json("Rates Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }

//delete existing one
exports.deleteRate = async (req, res) => {
    let rateID = req.params.id;
   
    await rateDetails.findByIdAndDelete(rateID).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateRate= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {rateID,
      discounthotelPercentage,
      discountpackagePercentage,
      discountProductsPercentage,
      discountvehiclePercentage,
      discountagentPercentage,
      discountguidePercentage,
      discountPromoCodePercentage,
      discountLiveRidePercentage,
      discountEventPercentage,
      hotelAdvertiseRate,
      packageAdvertiseRate,
      productsAdvertiseRate,
      vehicleAdvertiseRate,
      agentAdvertiseRate,
      guideAdvertiseRate,
      promoCodeRate,
      liveRideRate,
      eventRate,
      earningRate,
           } = req.body;
  
    const updateRate = {
      rateID,
      discounthotelPercentage,
      discountpackagePercentage,
      discountProductsPercentage,
      discountvehiclePercentage,
      discountagentPercentage,
      discountguidePercentage,
      discountPromoCodePercentage,
      discountLiveRidePercentage,
      discountEventPercentage,
      hotelAdvertiseRate,
      packageAdvertiseRate,
      productsAdvertiseRate,
      vehicleAdvertiseRate,
      agentAdvertiseRate,
      guideAdvertiseRate,
      promoCodeRate,
      liveRideRate, 
      eventRate,
      earningRate,
    }
  
  
    const update = await rateDetails.findByIdAndUpdate(id, updateRate).then(() => {
      res.status(200).send({status: "Result updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
  }

//view 
exports.viewRates= async (req, res) => { 
 
    //calling  model
    rateDetails.find().then((rates) => {
      res.json(rates)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneRate = async (req, res) => {
    
    let rateID = req.params.id;
    const rate = await rateDetails.findById(rateID).then((rate) => {
        res.status(200).send({status: "  fetched", rate})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }