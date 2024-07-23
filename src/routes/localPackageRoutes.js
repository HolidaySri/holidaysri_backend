const router = require("express").Router();

const {addNewLocalPackage,viewLocalPackages,viewOneLocalPackage, updateLocalPackage,deleteLocalPackage} = require ('../controllers/localPackageController.js')
 
router.post("/add", addNewLocalPackage);
router.get("/", viewLocalPackages);
router.put("/update/:id",updateLocalPackage);
router.delete("/delete/:id",deleteLocalPackage);
router.get("/get/:id", viewOneLocalPackage);



module.exports = router;