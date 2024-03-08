const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationName: {
        type: String,
    },
    district: {
        type: String,
    },
    province: {
        type: String,
    },
    distanceFromColombo: {
        type: String,
    },
    locationImages: {
        type: [String], // Array of strings to store image URLs
        validate: {
            validator: function (v) {
                return v.length <= 6; // Validate that the array length is at most 6
            },
            message: props => `${props.value} exceeds the limit of 6 images per location!`
        }
    },
    details: {
        type: String,
    }
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
