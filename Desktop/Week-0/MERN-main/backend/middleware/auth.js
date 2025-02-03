const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Bus = require('../models/bus'); // Assuming there's a Bus model
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from React app

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded userId to the request object
    req.userId = decoded.userId;

    // Check if the user exists in the database
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // If the request includes a busId (either from body or params), validate its existence
    const busId = req.params.busId || req.body.busId;

    if (busId) {
      const bus = await Bus.findById(busId);
      if (!bus) {
        return res.status(404).json({ message: 'Bus not found with the provided busId' });
      }
      req.bus = bus; // Attach the bus object to the request
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Authentication Error:', error); // Log the error for debugging
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

// Admin Middleware
const adminMiddleware = (req, res, next) => {
  try {
    // Check if the authenticated user is an admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Allow access to the next middleware/route handler if the user is an admin
    next();
  } catch (error) {
    console.error('Authorization Error:', error); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred during authorization', error: error.message });
  }
};

module.exports = { authMiddleware, adminMiddleware };
