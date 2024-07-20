const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({

    
    packageName: {
       type: String,
    },

    category: {
       type:String
    },

    email: {
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
      type: [String], // Array of strings to store image URLs
      validate: {
          validator: function (v) {
              return v.length <= 6; // Validate that the array length is at most 6
          },
          message: props => `${props.value} exceeds the limit of 6 images per location!`
      }
  },

    activities: {
      type: String
    },
   
}, { timestamps: true }); // Adding { timestamps: true } here

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
