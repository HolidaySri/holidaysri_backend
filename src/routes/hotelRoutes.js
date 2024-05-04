const router = require("express").Router();

const {addNewHotel,viewHotels,viewOneHotel, updateHotel,deleteHotel,viewHotelByLocation} = require ('../controllers/HotelController.js')

//add new Hotel 
router.post("/add", addNewHotel);

//view all Hotels
router.get("/", viewHotels);

//update existing Hotel
 router.put("/updateHotel/:id",updateHotel);

//delete existing one
 router.delete("/delete/:id",deleteHotel);

//view one Hotel
router.get("/get/:id", viewOneHotel);

//view one Hotel
router.get("/getlocation/:locationid", viewHotelByLocation);


module.exports = router;