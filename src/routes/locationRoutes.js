const router = require("express").Router();

const {addNewLocation,viewLocations,viewOneLocation, updateLocation,deleteLocation} = require ('../controllers/LocationController.js')

//add new Location 
router.post("/add", addNewLocation);

//view all Locations
router.get("/", viewLocations);

//update existing Location
 router.put("/updateLocation/:id",updateLocation);

//delete existing one
 router.delete("/delete/:id",deleteLocation);

//view one Location
router.get("/get/:id", viewOneLocation);



module.exports = router;