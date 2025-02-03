const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  //busNo: { type: String, required: true }, // Adding busNo for reference
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seatNumber: { type: Number, required: true },
});

module.exports = mongoose.model('Ticket', ticketSchema);
