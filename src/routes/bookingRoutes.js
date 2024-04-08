const router = require("express").Router();

const {addNewBooking,viewBookings,viewOneBooking, updateBooking,deleteBooking} = require ('../controllers/bookingController.js')

//add new Event 
router.post("/add", addNewBooking);

//view all Events
router.get("/", viewBookings);

//update existing Event
 router.put("/updateBooking/:id",updateBooking);

//delete existing one
 router.delete("/delete/:id",deleteBooking);

//view one Event
router.get("/get/:id", viewOneBooking);

module.exports = router;