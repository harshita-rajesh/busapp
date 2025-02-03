const Bus = require('../models/Busmodel');
const express = require('express');
const router = express.Router();

// Add a new bus
const addBus = async (req, res) => {
  try {
    const { name, from, to, totalSeats,priceperseat } = req.body;

    if (!name || !from || !to || !totalSeats || !priceperseat) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new bus
    const newBus = new Bus({
      name,
      from,
      to,
      totalSeats,
      availableSeats: totalSeats, // Initialize availableSeats with totalSeats
      priceperseat

    });

    await newBus.save();
    res.status(201).json({ message: 'Bus added successfully', bus: newBus });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add bus', error: error.message });
  }
};

// View all buses
const viewBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses); // Return all buses
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buses', error: error.message });
  }
};

// View bus details by ID
const viewBusDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findById(id);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json(bus); // Return bus details including from, to, and other fields
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bus details', error: error.message });
  }
};

//reset
const resetbus = async (req, res) => {
  const { busId } = req.params;

  try {
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Reset only the availableSeats and clear the tickets array
    bus.availableSeats = bus.totalSeats;  // Reset availableSeats to totalSeats
    bus.tickets = [];  // Clear all booked tickets

    await bus.save();

    res.json({ message: 'Bus seats have been reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to reset bus seats', error: error.message });
  }
};




module.exports = { addBus, viewBuses, viewBusDetails, resetbus };
