const event = require("../models/Event");
//add new Event for system
exports.addNewEvent= async (req, res) => {
 
    //constant variables for the attributes
    const {eventName,eventLocation, description,images} = req.body;
  
  
    event.findOne({eventName: eventName})
      .then((savedEvent) => {
          if(savedEvent) {
              return res.status(422).json({error:"Event Name already exists "})
          }
  
          const newEvent = new event({
            eventName,
            eventLocation,
            description,
            images
        })
    
        newEvent.save().then(() => {
             res.json("New Event Added")
    
        }).catch((err) => {
          
        })
      
    }).catch((err) =>{
        
    })
    }
    
    //delete existing one
    exports.deleteEvent = async (req, res) => {
    let eventId = req.params.id;
    
    await event.findByIdAndDelete(eventId).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
    }
    
    //update 
    exports.updateEvent= async (req, res) => { 
    //fetch id from url
    let eventid = req.params.id;
    const {eventName, eventLocation,description,images} = req.body;
    const updateEvent = {
        eventName, eventLocation,description,images
    }
  
    const update = await event.findByIdAndUpdate(eventid, updateEvent).then(() => {
      res.status(200).send({status: "Event details successfully updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
    }
    
    //view 
    exports.viewEvents= async (req, res) => { 
    //calling  model
    event.find().then((event) => {
      res.json(event)
    }).catch((err) => {

    })
    }

   //view one
   exports.viewOneEvent = async (req, res) => {
    
    let eventid = req.params.id;
    const event = await event.findById(eventid).then((event) => {
        res.status(200).send({status: "  fetched", event})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }


  //view events by loaction
  exports.viewEventsByLocation = async (req, res) => { 
  // Get the location from the request query
  const { location } = req.query;

  // If location is provided, filter events by location
  const filter = location ? { eventLocation: location } : {};

  // Find events based on the filter
  event.find(filter)
      .then((events) => {
          res.json(events);
      })
      .catch((err) => {
          res.status(500).json({ error: "Error fetching events", message: err.message });
      });
};




