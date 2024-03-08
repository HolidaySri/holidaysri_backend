const router = require("express").Router();

const {addNewProduct,viewProducts,viewOneProduct, updateProduct,deleteProduct} = require ('../controllers/ProductController.js')

//add new Product 
router.post("/add", addNewProduct);

//view all Products
router.get("/", viewProducts);

//update existing Product
 router.put("/updateProduct/:id",updateProduct);

//delete existing one
 router.delete("/delete/:id",deleteProduct);

//view one Product
router.get("/get/:id", viewOneProduct);



module.exports = router;