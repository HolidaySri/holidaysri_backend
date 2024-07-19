const Booking = require("../models/Booking");
const Backup = require("../models/Backup");

// add new booking for system
exports.addNewBooking = async (req, res) => {
  const { userName, hotelName, personCount, roomsCount, checkinDate, checkoutDate } = req.body;

  Booking.findOne({ userName: userName })
    .then((savedBooking) => {
      const newBooking = new Booking({
        userName,
        hotelName,
        personCount,
        roomsCount,
        checkinDate,
        checkoutDate
      });

      newBooking.save().then(() => {
        res.json("New Booking Added");
      }).catch((err) => {
        res.status(500).json({ error: "Error adding booking", message: err.message });
      });
    }).catch((err) => {
      res.status(500).json({ error: "Error finding booking", message: err.message });
    });
};

// delete existing one
exports.deleteBooking = async (req, res) => {
  let bookingId = req.params.id;

  try {
    const bookingToDelete = await Booking.findById(bookingId);

    if (!bookingToDelete) {
      return res.status(404).json({ status: "Booking not found" });
    }

    const Data = [
      `userName: ${bookingToDelete.userName}`,
      `hotelName: ${bookingToDelete.hotelName}`,
      `personCount: ${bookingToDelete.personCount}`,
      `roomsCount: ${bookingToDelete.roomsCount}`,
      `checkinDate: ${bookingToDelete.checkinDate}`,
      `checkoutDate: ${bookingToDelete.checkoutDate}`
    ];

    const deletedBooking = new Backup({
      Data,
      originalModel: "Booking"
    });

    await deletedBooking.save();
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ status: "Deleted Successfully and backed up" });
  } catch (error) {
    res.status(500).json({ status: "Error with Deleting", error: error.message });
  }
};

// update 
exports.updateBooking = async (req, res) => {
  let bookingId = req.params.id;
  const { userName, hotelName, personCount, roomsCount, checkinDate, checkoutDate } = req.body;
  const updateBooking = {
    userName,
    hotelName,
    personCount,
    roomsCount,
    checkinDate,
    checkoutDate
  };

  Booking.findByIdAndUpdate(bookingId, updateBooking)
    .then(() => {
      res.status(200).send({ status: "Booking details successfully updated" });
    }).catch((err) => {
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
};

// view 
exports.viewBookings = async (req, res) => {
  Booking.find().then((bookings) => {
    res.json(bookings);
  }).catch((err) => {
    res.status(500).json({ error: "Error fetching bookings", message: err.message });
  });
};

// view one
exports.viewOneBooking = async (req, res) => {
  let bookingId = req.params.id;

  Booking.findById(bookingId)
    .then((bookingDetails) => {
      if (!bookingDetails) {
        return res.status(404).send({ status: "Booking not found" });
      }
      res.status(200).send({ status: "Booking fetched", bookingDetails });
    }).catch((err) => {
      res.status(500).send({ status: "Error with get", error: err.message });
    });
};
