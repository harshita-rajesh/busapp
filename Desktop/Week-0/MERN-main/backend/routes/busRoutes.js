const express = require('express');
const { addBus, viewBuses, viewBusDetails, resetbus } = require('../controllers/buscontroller');
const router = express.Router();

// Route to add a new bus
router.post('/add', addBus);

// Route to view all buses
router.get('/', viewBuses);

// Route to view bus details by ID
router.get('/:id', viewBusDetails);

// Route to reset a bus (reset availableSeats to totalSeats)
router.put('/reset/:id', resetbus);

module.exports = router;
