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

    location: {
       type: String
    },

    image: {
      type: String
    },

    contactNumber: {
      type: String
    },
   
}, { timestamps: true }); // Adding { timestamps: true } here

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
