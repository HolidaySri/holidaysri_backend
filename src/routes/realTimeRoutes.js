const express = require('express');

const {addNewRealTime, viewRealTime,viewOneRealTime,deleteRealTime,updateRealTime, viewOneRealTimeByName} = require ('../controllers/realTimeController')

const router = express.Router();

//add new dog 
router.post("/add", addNewRealTime);

//delete existing one
router.delete("/delete/:id", deleteRealTime);

//update existing evaluation
router.put("/update/:id", updateRealTime);

//view all dogs
router.get("/", viewRealTime);

//view one dog
router.get("/:id", viewOneRealTime);

//view one dog
router.get("/get/:name", viewOneRealTimeByName);

module.exports = router;