const product = require("../models/Product");
//add new Product for system
exports.addNewProduct= async (req, res) => {
 
    //constant variables for the attributes
    const {productName,location, description} = req.body;
  
  
    product.findOne({productName: productName})
      .then((savedProduct) => {
          if(savedProduct) {
              return res.status(422).json({error:"Product Name already exists "})
          }
  
          const newProduct = new product({
            productName,
            location,
            description
        })
    
        newProduct.save().then(() => {
             res.json("New Product Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }
    
    //delete existing one
    exports.deleteProduct = async (req, res) => {
    let productId = req.params.id;
    
    await product.findByIdAndDelete(productId).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
    }
    
    //update 
    exports.updateProduct= async (req, res) => { 
    //fetch id from url
    let productid = req.params.id;
    const {productName, location,description} = req.body;
    const updateProduct = {
        productName, location,description
    }
  
    const update = await product.findByIdAndUpdate(productid, updateProduct).then(() => {
      res.status(200).send({status: "Product details successfully updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
    }
    
    //view 
    exports.viewProducts= async (req, res) => { 
    //calling  model
    product.find().then((product) => {
      res.json(product)
    }).catch((err) => {

    })
    }

   //view one
   exports.viewOneProduct = async (req, res) => {
    
    let productid = req.params.id;
    const product = await product.findById(productid).then((product) => {
        res.status(200).send({status: "  fetched", product})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }



