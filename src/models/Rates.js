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
    discountProductsPercentage: {
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
    discountPromoCodePercentage: {
        type: Number,
    },
    discountLiveRidePercentage: {
        type: Number,
    },
    discountEventPercentage: {
        type: Number,
    },
    discountPartnerPercentage: {
        type: Number,
    },
    hotelAdvertiseRate: {
        type: Number,
    },
    packageAdvertiseRate: {
        type: Number,
    },
    productsAdvertiseRate: {
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
    promoCodeLocalRate: {
        type: Number,
    },
    promoCodeForeignRate: {
        type: Number,
    },
    liveRideMonthlyRate: {
        type: Number,
    },
    liveRideDailyRate: {
        type: Number,
    },
    eventRate: {
        type: Number,
    },
    earningRate: {
        type: Number,
    },
    partnerRate: {
        type: Number,
    },
    dailyFoodRate: {
        type: Number,
    },
    monthlyFoodRate: {
        type: Number,
    },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const Rate = mongoose.model("Rates", rateSchema);
module.exports = Rate;

