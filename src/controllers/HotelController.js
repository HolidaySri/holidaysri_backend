const hotel = require("../models/Hotel");
//add new hotel for system
exports.addNewHotel= async (req, res) => {
 
    //constant variables for the attributes
    const {hotelName,category,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl
   } = req.body;
  
  
    hotel.findOne({hotelName: hotelName})
      .then((savedHotel) => {
         
  
          const newHotel = new hotel({
            hotelName,category,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl   
        })
    
        newHotel.save().then(() => {
             res.json("New Hotel Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }
    
    //delete existing one
    exports.deleteHotel = async (req, res) => {
    let hotelId = req.params.id;
    
    await hotel.findByIdAndDelete(hotelId).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
    }
    
    //update 
    exports.updateHotel= async (req, res) => { 
    //fetch id from url
    let hotelid = req.params.id;
    const {hotelName,category,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl   } = req.body;
    const updateHotel = {
        hotelName,category,location,description,price,images, googleMap,whatsappNumber,fb,contactNumber,webUrl   
    }
  
    const update = await hotel.findByIdAndUpdate(hotelid, updateHotel).then(() => {
      res.status(200).send({status: "Hotel details successfully updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
    }
    
    //view 
    exports.viewHotels= async (req, res) => { 
    //calling  model
    hotel.find().then((hotel) => {
      res.json(hotel)
    }).catch((err) => {

    })
    }

   //view one
   exports.viewOneHotel = async (req, res) => {
    
    let hotelid = req.params.id;
    const hotel = await hotel.findById(hotelid).then((hotel) => {
        res.status(200).send({status: "  fetched", hotel})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }

//view one
exports.viewHotelByLocation = async (req, res) => {
    
  let locationid = req.params.location;
  const location = await hotel.find(locationid).then((location) => {
      res.status(200).send({status: "  fetched", location})
  }).catch(() => {
      
       res.status(500).send({status:"Error with get " , error: err.message})
  })
}

