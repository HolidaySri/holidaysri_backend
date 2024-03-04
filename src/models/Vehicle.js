const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
    {
      vehicleNumber: String,
      Vehiclecategory: String,
      contactNumber: String,
      price: Number,
      nic: String,
      gender: String, 
      expDate: Date,
      description: String,
      imgUrl: String,
      promoCode: String
    },
    { timestamps: true }
  );
  
  const VehicleDetails = mongoose.model('Vehicle', VehicleSchema);
  
  module.exports = VehicleDetails;