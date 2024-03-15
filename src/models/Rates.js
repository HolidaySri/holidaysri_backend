const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({

    rateID: {
        type: String,
    },
    discountHotelPercentage: {
        type: Number,
    },
    discountPackagePercentage: {
        type: Number,
    },
    discountSouveniourPercentage: {
        type: Number,
    },
    discountGiftsPercentage: {
        type: Number,
    },
    discountCollectiblePercentage: {
        type: Number,
    },
    discountVehiclePercentage: {
        type: Number,
    },
    discountAgentPercentage: {
        type: Number,
    },
    discountGuidePercentage: {
        type: Number,
    },
    hotelAdvertiseRate: {
        type: Number,
    },
    SouveniourAdvertiseRate: {
        type: Number,
    },
    giftAdvertiseRate: {
        type: Number,
    },
    collectibleAdvertiseRate: {
        type: Number,
    },
    vehicleAdvertiseRate: {
        type: Number,
    },
    agentRegisterRate: {
        type: Number,
    },
    guideRegisterRate: {
        type: Number,
    },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const Rate = mongoose.model("Rates", rateSchema);
module.exports = Rate;

