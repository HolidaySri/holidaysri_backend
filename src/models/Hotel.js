const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({

    
    hotelName: {
       type: String,
    },

    category: {
       type:String
    },

    location: {
       type: String,
    },

    description: {
       type: String,
    },

    price: {
       type: String
    },

    images: {
      type: String
    },

    distance: {
      type: String
    },
   
}, { timestamps: true }); // Adding { timestamps: true } here

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
