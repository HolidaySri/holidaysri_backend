const location = require("../models/Location");

//add new Location for system
exports.addNewLocation= async (req, res) => {
 
    //constant variables for the attributes
    const {locationName,district, province,distanceFromColombo,images,details,backgroundImage} = req.body;
  
  
    location.findOne({locationName: locationName})
      .then((savedLocation) => {
         
  
          const newLocation = new location({
            locationName,
            district,
            province,
            distanceFromColombo,
            images,
            details,
            backgroundImage
        })
    
        newLocation.save().then(() => {
             res.json("New Location Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }
    
    //delete existing one
    exports.deleteLocation = async (req, res) => {
    let locationId = req.params.id;
    
    await location.findByIdAndDelete(locationId).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
    }
    
    //update 
    exports.updateLocation= async (req, res) => { 
    //fetch id from url
    let locationid = req.params.id;
    const {locationName,district, province,distanceFromColombo,images,details,backgroundImage} = req.body;
    const updateLocation = {
        locationName,district, province,distanceFromColombo,images,details,backgroundImage
    }
  
    const update = await location.findByIdAndUpdate(locationid, updateLocation).then(() => {
      res.status(200).send({status: "Location details successfully updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
    }
    
    //view 
    exports.viewLocations= async (req, res) => { 
    //calling  model
    location.find().then((location) => {
      res.json(location)
    }).catch((err) => {

    })
    }

 /*  //view one
   exports.viewOneLocation = async (req, res) => {
    
    let locationid = req.params.id;
    const location = await location.findById(locationid).then((location) => {
        res.status(200).send({status: "  fetched", location})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }
*/


  exports.viewOneLocation = async (req, res) => {
    try {
      const locationId = req.params.id;
      const foundLocation = await location.findById(locationId); // Assuming Location is your model
      if (!foundLocation) {
        return res.status(404).json({ status: "Location not found" });
      }
      res.status(200).json({ status: "Location fetched", location: foundLocation });
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ status: "Error with get", error: error.message });
    }
  };
  