import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TicketBookingForm = () => {
  const [searchParams] = useSearchParams();
  const busId = searchParams.get('id'); // Get bus ID from query parameters
  const navigate = useNavigate();
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch bus details to get the price per seat
    const fetchBusDetails = async () => {
      try {
        if (!busId) {
          setError('Invalid Bus ID.');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/buses/${busId}`);
        const busData = response.data;

        if (!busData || !busData.priceperseat) {
          setError('Failed to fetch valid bus details.');
          return;
        }

        setPricePerSeat(busData.priceperseat);
        setTotalPrice(busData.priceperseat); // Set initial total price
      } catch (error) {
        console.error('Error fetching bus details:', error);
        setError('Failed to fetch bus details.');
      }
    };

    fetchBusDetails();
  }, [busId]);

  useEffect(() => {
    // Calculate total price whenever number of seats changes
    setTotalPrice(pricePerSeat * numberOfSeats);
  }, [numberOfSeats, pricePerSeat]);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        setError('User is not authenticated.');
        return;
      }

      await axios.post(
        'http://localhost:5000/api/tickets/book',
        { busId, numberOfSeats },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Ticket booked successfully!');
      //navigate('/ickets'); // Navigate to the viewtickets page after success
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to book ticket.');
      console.error('Error booking ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handle}>
      <h2>Book Ticket</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Number of Seats:</label>
        <input
          type="number"
          value={numberOfSeats}
          min="1"
          onChange={(e) => setNumberOfSeats(parseInt(e.target.value) || 1)}
          required
        />
      </div>
      <div>
        <label>Price per Seat:</label>
        <input
          type="text"
          value={`₹${pricePerSeat}`}
          readOnly
        />
      </div>
      <div>
        <label>Total Price:</label>
        <input
          type="text"
          value={`₹${totalPrice}`}
          readOnly
        />
      </div>
      <button type="submit" disabled={loading || !busId}>
        {loading ? 'Booking...' : 'Book Ticket'}
      </button>
    </form>
  );
};

export default TicketBookingForm;
