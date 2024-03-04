const express = require('express');

const {addNewVehicle,viewVehicle,viewOneVehicle,deleteVehicle,updateVehicle} = require ('../controllers/vehicleController')

const router = express.Router();

//add new dog 
router.post("/add", addNewVehicle);

//delete existing one
router.delete("/delete/:id", deleteVehicle);

//update existing evaluation
router.put("/update/:id", updateVehicle);

//view all dogs
router.get("/", viewVehicle);

//view one dog
router.get("/:id", viewOneVehicle);

module.exports = router;