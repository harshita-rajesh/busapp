import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTickets = () => {
  const [userId, setUserId] = useState('');
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets/user/tickets?userId=${userId}`);
      setTickets(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch tickets');
    }
  };

  useEffect(() => {
    if (userId) fetchTickets();
  }, [userId]);

  return (
    <div>
      <h1>View Tickets</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchTickets}>Fetch Tickets</button>

      {message && <p>{message}</p>}

      {tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.ticketId}>
              <p>Ticket ID: {ticket.ticketId}</p>
              <p>Bus ID: {ticket.busId._id}</p>
              <p>Seat Number: {ticket.seatNumber}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default ViewTickets;
