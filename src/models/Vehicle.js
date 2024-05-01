const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema(
    {
      vehicleNumber: String,
      Vehiclecategory: String,
      contactNumber: String,
      price: Number,
      nic: String,
      gender: String, 
      description: String,
      images: String,
      location:String,
      promoCode: String,
      driverStatus: String
    },
  );
  
  const VehicleDetails = mongoose.model('Vehicle', VehicleSchema);
  
  module.exports = VehicleDetails;