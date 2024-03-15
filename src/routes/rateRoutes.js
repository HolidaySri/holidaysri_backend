const router = require("express").Router();

const {addRate,viewRates,viewOneRate, updateRate,deleteRate} = require ('../controllers/RateController.js')

//add new Hotel 
router.post("/add", addRate);

//view all Hotels
router.get("/", viewRates);

//update existing Hotel
 router.put("/updateRate/:id",updateRate);

//delete existing one
 router.delete("/delete/:id",deleteRate);

//view one Hotel
router.get("/get/:id", viewOneRate);



module.exports = router;