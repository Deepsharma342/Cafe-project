const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: () => new Date().toISOString().split("T")[0],
  },
  time: {
    type: String,
    required: true,
  },
  guests: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
