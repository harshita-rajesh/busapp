// FinalizeBooking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinalizeBooking = ({ location }) => {
  const [status, setStatus] = useState('');
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const finalize = async () => {
      const urlParams = new URLSearchParams(location.search);
      const ticketData = JSON.parse(urlParams.get('ticketData'));
      setTicketData(ticketData);
      setStatus('Processing payment and booking...');

      try {
        const response = await axios.post('http://localhost:5000/api/tickets/payment/finalize', {
          ticketData
        });
        setStatus('Booking finalized successfully!');
      } catch (error) {
        setStatus('Failed to finalize booking');
        console.error(error);
      }
    };

    finalize();
  }, [location]);

  return <div>{status}</div>;
};

export default FinalizeBooking;
