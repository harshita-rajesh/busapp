const express = require('express');
const {
    bookTicket,
    viewTickets,
    cancelTicket,
    // adminCancelTickets,
    // createPaymentSession,
    // finalizeBooking
} = require('../controllers/ticketcontroller');

const router = express.Router();

// Route to book a ticket
router.post('/book/:busId', bookTicket);

// Route to view all tickets for a user
router.get('/user/tickets', viewTickets);

// Route to cancel a ticket
router.delete('/cancel/:id', cancelTicket);

// // Admin route to cancel all tickets for a bus
// router.delete('/admin/cancel/:id', adminCancelTickets);

// // Route to finalize booking 
// router.post('/finalize', finalizeBooking);

module.exports = router;
