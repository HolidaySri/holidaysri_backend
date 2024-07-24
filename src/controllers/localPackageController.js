const LocalPackage = require("../models/LocalPackage");
const Backup = require("../models/Backup");

exports.addNewLocalPackage = async (req, res) => {
  const { localPackageName, email, category, location, description, price, images, activities, mobile } = req.body;

  LocalPackage.findOne({ localPackageName: localPackageName })
    .then((savedLocalPackage) => {
      if (savedLocalPackage) {
        return res.status(422).json({ error: "Local Package Name already exists" });
      }

      const newLocalPackage = new LocalPackage({
        localPackageName,
        email,
        category,
        location,
        description,
        price,
        images,
        activities,
        mobile
      });

      newLocalPackage.save().then(() => {
        res.json("New Local Package Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding local package", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding local package", message: err.message });
    });
};

// delete existing one
exports.deleteLocalPackage = async (req, res) => {
  let packageId = req.params.id;

  try {
    const localPackageToDelete = await LocalPackage.findById(packageId);

    if (!localPackageToDelete) {
      return res.status(404).json({ status: "Local Package not found" });
    }

    const Data = [
      `localPackageName: ${localPackageToDelete.localPackageName}`,
      `email: ${localPackageToDelete.email}`,
      `category: ${localPackageToDelete.category}`,
      `location: ${localPackageToDelete.location}`,
      `description: ${localPackageToDelete.description}`,
      `price: ${localPackageToDelete.price}`,
      `images: ${Array.isArray(localPackageToDelete.images) ? localPackageToDelete.images.join(', ') : localPackageToDelete.images}`,
      `activities: ${localPackageToDelete.activities}`,
      `mobile: ${localPackageToDelete.mobile}`
    ];

    const deletedLocalPackage = new Backup({
      Data,
      originalModel: "LocalPackage"
    });

    await deletedLocalPackage.save();
    await LocalPackage.findByIdAndDelete(packageId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// update 
exports.updateLocalPackage = async (req, res) => { 
  let packageId = req.params.id;
  const { localPackageName, email, category, location, description, price, images, activities, mobile } = req.body;
  const updateLocalPackage = {
    localPackageName,
    email,
    category,
    location,
    description,
    price,
    images,
    activities,
    mobile
  };

  LocalPackage.findByIdAndUpdate(packageId, updateLocalPackage)
    .then(() => {
      res.status(200).send({ status: "Local Package details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// view 
exports.viewLocalPackages = async (req, res) => {
  LocalPackage.find().then((packages) => {
    res.json(packages);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching local packages", message: err.message });
  });
};

// view one
exports.viewOneLocalPackage = async (req, res) => {
  let packageId = req.params.id;

  LocalPackage.findById(packageId)
    .then((localPackage) => {
      if (!localPackage) {
        return res.status(404).send({ status: "Local Package not found" });
      }
      res.status(200).send({ status: "Local Package fetched", localPackage });
    }).catch((err) => {
      res.status(500).send({ status: "Error with get", error: err.message });
    });
};
