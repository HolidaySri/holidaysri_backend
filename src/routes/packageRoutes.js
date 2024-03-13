const router = require("express").Router();

const {addNewPackage,viewPackages,viewOnePackage, updatePackage,deletePackage} = require ('../controllers/packageController.js')

//add new Package 
router.post("/add", addNewPackage);

//view all Packages
router.get("/", viewPackages);

//update existing Package
 router.put("/updatePackage/:id",updatePackage);

//delete existing one
 router.delete("/delete/:id",deletePackage);

//view one Package
router.get("/get/:id", viewOnePackage);



module.exports = router;