const mongoose = require('mongoose');

// Define the bus schema
const busSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Bus name
  from: { type: String, required: true }, // Departure location
  to: { type: String, required: true },   // Arrival location
  totalSeats: { type: Number, required: true }, // Total number of seats
  availableSeats: { type: Number, required: true }, // Available seats
  priceperseat: { type: Number, required: true }, // Price per seat
  tickets: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      seatNumber: { type: Number },
      price: { type: Number, default: function() { return this.priceperseat; } }, // Default price set to price per seat
    },
  ],
});

// Export the Bus model
module.exports = mongoose.model('Bus', busSchema);
