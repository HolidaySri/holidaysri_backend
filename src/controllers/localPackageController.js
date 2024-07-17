const localPackages = require("../models/LocalPackage");

exports.addNewLocalPackage= async (req, res) => {
 
 
    const {localPackageName,category,location,description,price,images,activities} = req.body;
  
  
    localPackages.findOne({localPackageName: localPackageName})
      .then((savedLocalPackage) => {
         
  
          const newLocalPackage = new localPackages({
            localPackageName,category,location,description,price,images,activities
        })
    
        newLocalPackage.save().then(() => {
             res.json("New Local Package Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }
    
    //delete existing one
    exports.deleteLocalPackage = async (req, res) => {
    let packageId = req.params.id;
    
    await localPackages.findByIdAndDelete(packageId).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
    }
    
    //update 
    exports.updateLocalPackage= async (req, res) => { 
  
    let packageid = req.params.id;
    const {localPackageName,category,location,description,price,images,activities} = req.body;
    const updateLocalPackage = {
        localPackageName,category,location,description,price,images,activities
    }
  
    const update = await localPackages.findByIdAndUpdate(packageid, updateLocalPackage).then(() => {
      res.status(200).send({status: "Local Package details successfully updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
    }
    
    //view 
    exports.viewLocalPackages= async (req, res) => { 
    //calling  model
    localPackages.find().then((package) => {
      res.json(package)
    }).catch((err) => {

    })
    }

   //view one
   exports.viewOneLocalPackage = async (req, res) => {
    
    let packageid = req.params.id;
    const package = await localPackages.findById(packageid).then((package) => {
        res.status(200).send({status: "  fetched", package})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }



