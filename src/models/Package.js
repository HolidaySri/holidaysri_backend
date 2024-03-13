const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({

    
    packageName: {
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

    activities: {
      type: String
    },
   
}, { timestamps: true }); // Adding { timestamps: true } here

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
