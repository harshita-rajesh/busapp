// TicketList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketList = () => {
  const [userId, setUserId] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/tickets/user/tickets', {
          params: { userId }
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [userId]);

  return (
    <div>
      <h2>Your Tickets</h2>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
      </div>
      <div>
        {loading ? (
          <p>Loading tickets...</p>
        ) : (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket._id}>
                <p>Bus ID: {ticket.busId}</p>
                <p>Seat: {ticket.seatNumber}</p>
                <p>User ID: {ticket.userId}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TicketList;
