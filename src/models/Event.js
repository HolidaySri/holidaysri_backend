const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  
    eventName: {
        type: String,
    },
    eventLocation: {
        type: String,
    },
    description: {
        type: String,
    },
    images: {
        type: String,
    },

   
}, { timestamps: true }); // Adding { timestamps: true } here

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

