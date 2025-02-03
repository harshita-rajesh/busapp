import React, { useState } from 'react';
import axios from 'axios';

const AddBus = () => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [priceperseat, setPriceperseat] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBus = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !from || !to || !totalSeats || !priceperseat) {
      setMessage('All fields are required.');
      return;
    }

    // Check that totalSeats and priceperseat are positive numbers
    if (totalSeats <= 0 || priceperseat <= 0) {
      setMessage('Total Seats and Price per Seat must be positive numbers.');
      return;
    }

    try {
      const response = await axios.post('/api/buses/add', {
        name,
        from,
        to,
        totalSeats: parseInt(totalSeats),  // Ensure it's a number
        priceperseat: parseFloat(priceperseat),  // Ensure it's a number
      });

      setMessage(response.data.message || 'Bus added successfully!');
      // Optionally, reset the form after success
      setName('');
      setFrom('');
      setTo('');
      setTotalSeats('');
      setPriceperseat('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add bus');
    }
  };

  return (
    <div>
      <h1>Add Bus</h1>
      <form onSubmit={handleAddBus}>
        <div>
          <label>Bus Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Bus Name"
            required
          />
        </div>
        <div>
          <label>From:</label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter From Location"
            required
          />
        </div>
        <div>
          <label>To:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter To Location"
            required
          />
        </div>
        <div>
          <label>Total Seats:</label>
          <input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            placeholder="Enter Total Seats"
            required
          />
        </div>
        <div>
          <label>Price per Seat:</label>
          <input
            type="number"
            value={priceperseat}
            onChange={(e) => setPriceperseat(e.target.value)}
            placeholder="Enter Price per Seat"
            required
          />
        </div>
        <button type="submit">Add Bus</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBus;
