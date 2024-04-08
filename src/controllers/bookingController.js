const booking = require("../models/Booking");
//add new hotel for system
exports.addNewBooking= async (req, res) => {
 
    //constant variables for the attributes
    const {userName,hotelName,personCount,roomsCount,checkinDate,checkoutDate} = req.body;
  
  
    booking.findOne({userName: userName})
      .then((savedBooking) => {
         
  
          const newBooking = new booking({
            userName,hotelName,personCount,roomsCount,checkinDate,checkoutDate
   
        })
    
        newBooking.save().then(() => {
             res.json("New Booking Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }
    
    //delete existing one
    exports.deleteBooking = async (req, res) => {
    let bookingId = req.params.id;
    
    await booking.findByIdAndDelete(bookingId).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
    }
    
    //update 
    exports.updateBooking = async (req, res) => { 
    //fetch id from url
    let bookingid = req.params.id;
    const {userName,hotelName,personCount,roomsCount,checkinDate,checkoutDate
   } = req.body;
    const updateBooking = {
        userName,hotelName,personCount,roomsCount,checkinDate,checkoutDate
   
    }
  
    const update = await booking.findByIdAndUpdate(bookingid, updateBooking).then(() => {
      res.status(200).send({status: "Booking details successfully updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
    }
    
    //view 
    exports.viewBookings= async (req, res) => { 
    //calling  model
    booking.find().then((booking) => {
      res.json(booking)
    }).catch((err) => {

    })
    }

   //view one
   exports.viewOneBooking = async (req, res) => {
    
    let bookingid = req.params.id;
    const bookingDetails = await booking.findById(bookingid).then((bookingDetails) => {
        res.status(200).send({status: "  fetched", bookingDetails})
    }).catch(() => {
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }



