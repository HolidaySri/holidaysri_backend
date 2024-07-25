const packages = require("../models/Package");
const Backup = require("../models/Backup");

exports.addNewPackage= async (req, res) => {
  
  const { packageName, category, email, location, description, price, images, activities } = req.body;

  packages.findOne({packageName: packageName})
    .then((savedPackage) => {
    

      const newPackage = new packages({
        packageName,category, email,location,description,price,images,activities
    })

    newPackage.save().then(() => {
      res.json("New Package Added")

 }).catch((err) => {
   
 })

}).catch((err) =>{
 
})
}

// Delete existing one
exports.deletePackage = async (req, res) => {
  let packageId = req.params.id;

  try {
    const packageToDelete = await packages.findById(packageId);

    if (!packageToDelete) {
      return res.status(404).json({ status: "Package not found" });
    }

    const Data = [
      `packageName: ${packageToDelete.packageName}`,
      `category: ${packageToDelete.category}`,
      `email: ${packageToDelete.email}`,
      `location: ${packageToDelete.location}`,
      `description: ${packageToDelete.description}`,
      `price: ${packageToDelete.price}`,
      `images: ${Array.isArray(packageToDelete.images) ? packageToDelete.images.join(', ') : packageToDelete.images}`,
      `activities: ${packageToDelete.activities}`
    ];

    const deletedPackage = new Backup({
      Data,
      originalModel: "Package"
    });

    await deletedPackage.save();
    await packages.findByIdAndDelete(packageId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

//update 
exports.updatePackage= async (req, res) => { 
  //fetch id from url
  let packageid = req.params.id;
  const {packageName,category,email,location,description,price,images,activities} = req.body;
  const updatePackage = {
      packageName,category,email,location,description,price,images,activities
  }

  const update = await packages.findByIdAndUpdate(packageid, updatePackage).then(() => {
    res.status(200).send({status: "Package details successfully updated"})
  }).catch((err) => {
     
      res.status(500).send({status: "Error with updating data", error: err.message});
  })   
  }

   //view 
   exports.viewPackages= async (req, res) => { 
    //calling  model
    packages.find().then((package) => {
      res.json(package)
    }).catch((err) => {

    })
    }

//view one
exports.viewOnePackage = async (req, res) => {
    
  let packageid = req.params.id;
  const package = await packages.findById(packageid).then((package) => {
      res.status(200).send({status: "  fetched", package})
  }).catch(() => {
      
       res.status(500).send({status:"Error with get " , error: err.message})
  })
}
