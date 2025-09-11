const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, message: "Booking saved successfully!" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: "Error saving booking." });
  }
};

module.exports = { createBooking };
