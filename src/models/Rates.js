const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({

    rateID: {
        type: String,
    },
    discounthotelPercentage: {
        type: Number,
    },
    discountpackagePercentage: {
        type: Number,
    },
    discountsouveniourPercentage: {
        type: Number,
    },
    discountgiftsPercentage: {
        type: Number,
    },
    discountcollectiblePercentage: {
        type: Number,
    },
    discountvehiclePercentage: {
        type: Number,
    },
    discountagentPercentage: {
        type: Number,
    },
    discountguidePercentage: {
        type: Number,
    },
    hotelAdvertiseRate: {
        type: Number,
    },
    packageAdvertiseRate: {
        type: Number,
    },
    souveniourAdvertiseRate: {
        type: Number,
    },
    giftsAdvertiseRate: {
        type: Number,
    },
    collectibleAdvertiseRate: {
        type: Number,
    },
    vehicleAdvertiseRate: {
        type: Number,
    },
    agentAdvertiseRate: {
        type: Number,
    },
    guideAdvertiseRate: {
        type: Number,
    },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const Rate = mongoose.model("Rates", rateSchema);
module.exports = Rate;

