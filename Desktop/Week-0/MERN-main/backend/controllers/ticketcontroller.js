const TicketModel = require('../models/Ticketmodel');
const BusModel = require('../models/Busmodel'); 
const stripe = require('stripe')("sk_test_51Q8Y4kRsqhDc2VKgLa2PjKTRXPgDdM9WjafgceaAXAASS6IfijsebbjB0RX1e0DE2KBPJPqrZevbpuNkZ9hUD33L002waprK2X");

// Function to book a ticket
exports.bookTicket = async (req, res) => {
  const { userId, seatNumber } = req.body;
  const { busId } = req.params;  // Now busId is from req.params
  
  // Validate required fields
  if (!userId || !busId || !seatNumber) {
    return res.status(400).json({ message: 'Missing required fields: userId, busId, or seatNumber' });
  }

  try {
    // Find the bus by busId
    const bus = await BusModel.findById(busId);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found with the given busId' });
    }

    // Check if the seat is already booked
    const existingTicket = await TicketModel.findOne({ busId: bus._id, seatNumber });
    if (existingTicket) {
      return res.status(400).json({ message: 'This seat is already booked. Please select a different seat.' });
    }

    // Create new ticket
    const newTicket = new TicketModel({
      userId,
      busId: bus._id,  // Use bus._id here
      seatNumber,
    });

    await newTicket.save();

    res.status(201).json({
      message: 'Ticket booked successfully!',
      ticket: newTicket,
    });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ message: 'Failed to book ticket', error: error.message });
  }
};

exports.viewTickets = async (req, res) => {
    try {
      const { userId } = req.query; // Expecting userId in query params
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Fetch tickets for the user and populate the busId reference
      const tickets = await TicketModel.find({ userId }).populate('busId');
  
      // Check if tickets exist for the user
      if (tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found for this user' });
      }
  
      // Attach ticket IDs and send the response
      const ticketsWithIds = tickets.map(ticket => ({
        ticketId: ticket._id, // Add the ticket ID to each ticket
        busId: ticket.busId,   // Bus details (populated)
        seatNumber: ticket.seatNumber,
        userId: ticket.userId,
      }));
  
      res.status(200).json(ticketsWithIds); // Return the modified tickets array
    } catch (error) {
      console.error('Error retrieving tickets:', error);
      res.status(500).json({ error: 'Failed to retrieve tickets', message: error.message });
    }
  };
  

// Function to cancel a ticket
exports.cancelTicket = async (req, res) => {
  const { id: ticketId } = req.params;

  try {
    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await TicketModel.findByIdAndDelete(ticketId);

    // Update bus availability
    const bus = await BusModel.findById(ticket.busId);
    if (bus) {
      bus.availableSeats += 1;
      await bus.save();
    }

    res.status(200).json({ message: 'Ticket cancelled successfully' });
  } catch (error) {
    console.error('Error canceling ticket:', error);
    res.status(500).json({ error: 'Failed to cancel ticket' });
  }
};

