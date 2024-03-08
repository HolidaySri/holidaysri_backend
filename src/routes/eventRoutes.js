const router = require("express").Router();

const {addNewEvent,viewEvents,viewOneEvent, updateEvent,deleteEvent} = require ('../controllers/EventController.js')

//add new Event 
router.post("/add", addNewEvent);

//view all Events
router.get("/", viewEvents);

//update existing Event
 router.put("/updateEvent/:id",updateEvent);

//delete existing one
 router.delete("/delete/:id",deleteEvent);

//view one Event
router.get("/get/:id", viewOneEvent);



module.exports = router;