const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors'); // Add CORS for handling cross-origin requests

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const KYCRoutes = require('./routes/KYCRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(morgan('dev')); // Log requests to the console

// Routes
app.use('/api/users', userRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/kyc', KYCRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Stack trace only in development
  });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/busbooking'; // Ensure fallback URI

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  });
