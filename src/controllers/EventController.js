const Event = require("../models/Event");
const Locations = require("../models/Location");
const DeletedEvent = require("../models/Backup");

// add new Event for system
exports.addNewEvent = async (req, res) => {
  const { eventName, email, eventLocation, description, images } = req.body;

  Event.findOne({ eventName: eventName })
    .then((savedEvent) => {
      if (savedEvent) {
        return res.status(422).json({ error: "Event Name already exists " });
      }

      const newEvent = new Event({
        eventName,
        email,
        eventLocation,
        description,
        images
      });

      newEvent.save().then(() => {
        res.json("New Event Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding event", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding event", message: err.message });
    });
};

// delete existing one
exports.deleteEvent = async (req, res) => {
  let eventId = req.params.id;

  try {
    const eventToDelete = await Event.findById(eventId);

    if (!eventToDelete) {
      return res.status(404).json({ status: "Event not found" });
    }

    const Data = [
      `eventName: ${eventToDelete.eventName}`,
      `email: ${eventToDelete.email}`,
      `eventLocation: ${eventToDelete.eventLocation}`,
      `description: ${eventToDelete.description}`,
      `images: ${eventToDelete.images.join(', ')}`
    ];

    const deletedEvent = new DeletedEvent({
      Data,
      originalModel: "Event"
    });

    await deletedEvent.save();
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// update 
exports.updateEvent = async (req, res) => {
  let eventId = req.params.id;
  const { eventName, email, eventLocation, description, images } = req.body;
  const updateEvent = {
    eventName,
    email,
    eventLocation,
    description,
    images
  };

  Event.findByIdAndUpdate(eventId, updateEvent)
    .then(() => {
      res.status(200).send({ status: "Event details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// view 
exports.viewEvents = async (req, res) => {
  Event.find().then((events) => {
    res.json(events);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching events", message: err.message });
  });
};

// view one
exports.viewOneEvent = async (req, res) => {
  let eventId = req.params.id;

  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).send({ status: "Event not found" });
      }
      res.status(200).send({ status: "Event fetched", event });
    }).catch((err) => {
      res.status(500).send({ status: "Error with get", error: err.message });
    });
};

// View events by location
exports.viewEventsByLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Locations.findById(id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const events = await Event.find({ eventLocation: location.locationName });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Error fetching events", message: err.message });
  }
};
