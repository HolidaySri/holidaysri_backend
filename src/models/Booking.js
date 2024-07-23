const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  
    email: {
        type: String,
    },
    hotelName: {
        type: String,
    },
    personCount: {
        type: String,
    },
    roomsCount: {
        type: String,
    },
    checkinDate: {
        type: String,
    },
    checkoutDate: {
        type: String,
    },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

