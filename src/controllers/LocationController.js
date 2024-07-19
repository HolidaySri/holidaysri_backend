const Location = require("../models/Location");
const Backup = require("../models/Backup");

// Add new Location for system
exports.addNewLocation = async (req, res) => {
  const { locationName, district, province, distanceFromColombo, images, details, backgroundImage } = req.body;

  Location.findOne({ locationName: locationName })
    .then((savedLocation) => {
      if (savedLocation) {
        return res.status(422).json({ error: "Location Name already exists" });
      }

      const newLocation = new Location({
        locationName,
        district,
        province,
        distanceFromColombo,
        images,
        details,
        backgroundImage
      });

      newLocation.save().then(() => {
        res.json("New Location Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding location", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding location", message: err.message });
    });
};

// Delete existing one
exports.deleteLocation = async (req, res) => {
  let locationId = req.params.id;

  try {
    const locationToDelete = await Location.findById(locationId);

    if (!locationToDelete) {
      return res.status(404).json({ status: "Location not found" });
    }

    const Data = [
      `locationName: ${locationToDelete.locationName}`,
      `district: ${locationToDelete.district}`,
      `province: ${locationToDelete.province}`,
      `distanceFromColombo: ${locationToDelete.distanceFromColombo}`,
      `images: ${Array.isArray(locationToDelete.images) ? locationToDelete.images.join(', ') : locationToDelete.images}`,
      `details: ${locationToDelete.details}`,
      `backgroundImage: ${locationToDelete.backgroundImage}`
    ];

    const deletedLocation = new Backup({
      Data,
      originalModel: "Location"
    });

    await deletedLocation.save();
    await Location.findByIdAndDelete(locationId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// Update
exports.updateLocation = async (req, res) => {
  let locationId = req.params.id;
  const { locationName, district, province, distanceFromColombo, images, details, backgroundImage } = req.body;
  const updateLocation = {
    locationName,
    district,
    province,
    distanceFromColombo,
    images,
    details,
    backgroundImage
  };

  Location.findByIdAndUpdate(locationId, updateLocation)
    .then(() => {
      res.status(200).send({ status: "Location details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// View all locations
exports.viewLocations = async (req, res) => {
  Location.find().then((locations) => {
    res.json(locations);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching locations", message: err.message });
  });
};

// View one location
exports.viewOneLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const foundLocation = await Location.findById(locationId);
    if (!foundLocation) {
      return res.status(404).json({ status: "Location not found" });
    }
    res.status(200).json({ status: "Location fetched", location: foundLocation });
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ status: "Error with get", error: error.message });
  }
};
