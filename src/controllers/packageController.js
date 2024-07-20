const Package = require("../models/Package");
const Backup = require("../models/Backup");

// Add new Package for system
exports.addNewPackage = async (req, res) => {
  const { packageName, category, email, location, description, price, images, activities } = req.body;

  Package.findOne({ packageName: packageName })
    .then((savedPackage) => {
      if (savedPackage) {
        return res.status(422).json({ error: "Package Name already exists" });
      }

      const newPackage = new Package({
        packageName,
        category,
        email,
        location,
        description,
        price,
        images,
        activities
      });

      newPackage.save().then(() => {
        res.json("New Package Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding package", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding package", message: err.message });
    });
};

// Delete existing one
exports.deletePackage = async (req, res) => {
  let packageId = req.params.id;

  try {
    const packageToDelete = await Package.findById(packageId);

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
    await Package.findByIdAndDelete(packageId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// Update
exports.updatePackage = async (req, res) => {
  let packageId = req.params.id;
  const { packageName, category, email, location, description, price, images, activities } = req.body;
  const updatePackage = {
    packageName,
    category,
    email,
    location,
    description,
    price,
    images,
    activities
  };

  Package.findByIdAndUpdate(packageId, updatePackage)
    .then(() => {
      res.status(200).send({ status: "Package details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// View all packages
exports.viewPackages = async (req, res) => {
  Package.find().then((packages) => {
    res.json(packages);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching packages", message: err.message });
  });
};

// View one package
exports.viewOnePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const foundPackage = await Package.findById(packageId);
    if (!foundPackage) {
      return res.status(404).json({ status: "Package not found" });
    }
    res.status(200).json({ status: "Package fetched", package: foundPackage });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ status: "Error with get", error: error.message });
  }
};
