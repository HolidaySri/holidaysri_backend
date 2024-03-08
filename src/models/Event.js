const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  
    eventName: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    }
   
}, { timestamps: true }); // Adding { timestamps: true } here

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

