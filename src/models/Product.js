const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

   
    productName: {
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
      type: [String], // Array of strings to store image URLs
      validate: {
          validator: function (v) {
              return v.length <= 6; // Validate that the array length is at most 6
          },
          message: props => `${props.value} exceeds the limit of 6 images per location!`
      }
  },
    contactNumber: {
      type: String
    },
   
}, { timestamps: true }); // Adding { timestamps: true } here

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
