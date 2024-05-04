const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realTimeSchema = new Schema({

    realTimeID: {
        type: String,
    },
    vehicleID: {
        type: String,
    },
    vehicleOwnerName: {
        type: String,
    },
    Route: {
        type: String,
    },
    Description: {
        type: String,
    },
    Maximum: {
        type: Number,
    },
    Availability: {
        type: Number,
    },
    CurrentLocation: {
        type: String,
    },
    Status: {
        type: String,
    },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const RealTime = mongoose.model("RealTime", realTimeSchema);
module.exports = RealTime;

