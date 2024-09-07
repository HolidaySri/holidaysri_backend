const vehicleDetails = require("../models/Vehicle");
const Backup = require("../models/Backup");

// Add new Vehicle for system
exports.addNewVehicle = async (req, res) => {
  const {
    vehicleNumber,
    Vehiclecategory,
    contactNumber,
    price,
    nic,
    email,
    gender,
    expDate,
    description,
    images,
    location,
    promoCode,
    driverStatus,
    capacity,
    ac
  } = req.body;

  try {
    const savedVehicle = await vehicleDetails.findOne({ vehicleNumber: vehicleNumber });

    if (savedVehicle) {
      return res.status(422).json({ error: "Vehicle already exists with that number" });
    }

    const newVehicle = new vehicleDetails({
      vehicleNumber,
      Vehiclecategory,
      contactNumber,
      price,
      nic,
      email,
      gender,
      expDate,
      description,
      images,
      location,
      promoCode,
      driverStatus,
      capacity,
      ac
    });

    await newVehicle.save();
    res.json("Vehicle Added");
  } catch (err) {
    res.status(500).json({ error: "Error adding vehicle details", message: err.message });
  }
};

// Delete existing one
exports.deleteVehicle = async (req, res) => {
  let vehicleNumber = req.params.id;

  try {
    const vehicleToDelete = await vehicleDetails.findById(vehicleNumber);

    if (!vehicleToDelete) {
      return res.status(404).json({ status: "Vehicle not found" });
    }

    const Data = [
      `vehicleNumber: ${vehicleToDelete.vehicleNumber}`,
      `Vehiclecategory: ${vehicleToDelete.Vehiclecategory}`,
      `contactNumber: ${vehicleToDelete.contactNumber}`,
      `price: ${vehicleToDelete.price}`,
      `nic: ${vehicleToDelete.nic}`,
      `email: ${vehicleToDelete.email}`,
      `gender: ${vehicleToDelete.gender}`,
      `expDate: ${vehicleToDelete.expDate}`,
      `description: ${vehicleToDelete.description}`,
      `images: ${vehicleToDelete.images}`,
      `location: ${vehicleToDelete.location}`,
      `promoCode: ${vehicleToDelete.promoCode}`,
      `driverStatus: ${vehicleToDelete.driverStatus}`,
      `capacity: ${vehicleToDelete.capacity}`,
      `ac: ${vehicleToDelete.ac}`
    ];

    const deletedVehicle = new Backup({
      Data,
      originalModel: "Vehicle"
    });

    await deletedVehicle.save();
    await vehicleDetails.findByIdAndDelete(vehicleNumber);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// Update
exports.updateVehicle = async (req, res) => {
  let id = req.params.id;
  const {
    vehicleNumber,
    Vehiclecategory,
    contactNumber,
    price,
    nic,
    email,
    gender,
    expDate,
    description,
    images,
    location,
    promoCode,
    driverStatus,
    capacity,
    ac
  } = req.body;

  const updateVehicle = {
    vehicleNumber,
    Vehiclecategory,
    contactNumber,
    price,
    nic,
    email,
    gender,
    expDate,
    description,
    images,
    location,
    promoCode,
    driverStatus,
    capacity,
    ac
  };

  try {
    await vehicleDetails.findByIdAndUpdate(id, updateVehicle);
    res.status(200).send({ status: "Vehicle details successfully updated" });
  } catch (err) {
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
};

// View all vehicles
exports.viewVehicle = async (req, res) => {
  try {
    const vehicles = await vehicleDetails.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Error fetching vehicles", message: err.message });
  }
};

// View one vehicle
exports.viewOneVehicle = async (req, res) => {
  let vehicleNumber = req.params.id;

  try {
    const vehicle = await vehicleDetails.findById(vehicleNumber);
    if (!vehicle) {
      return res.status(404).json({ status: "Vehicle not found" });
    }
    res.status(200).send({ status: "Vehicle details fetched", vehicle });
  } catch (err) {
    res.status(500).send({ status: "Error with get", error: err.message });
  }
};

// View vehicles by email
exports.viewVehicleByEmail = async (req, res) => {
  const { email } = req.query; // Capture email from query parameter

  try {
    const vehicles = await vehicleDetails.find({ email: email });

    if (vehicles.length === 0) {
      return res.status(404).json({ status: "No vehicles found for this email" });
    }

    res.status(200).json({ status: "Vehicles fetched successfully", vehicles });
  } catch (err) {
    res.status(500).json({ error: "Error fetching vehicles", message: err.message });
  }
};