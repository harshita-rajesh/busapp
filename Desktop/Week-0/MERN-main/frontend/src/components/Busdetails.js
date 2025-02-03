import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BusDetails = () => {
  const [bus, setBus] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/buses/${id}`)
      .then(response => setBus(response.data))
      .catch(error => console.error('Error fetching bus details:', error));
  }, [id]);

  if (!bus) return <div>Loading...</div>;

  return (
    <div>
      <h1>{bus.name}</h1>
      <p>From: {bus.from}</p>
      <p>To: {bus.to}</p>
      <p>Total Seats: {bus.totalSeats}</p>
      <p>Available Seats: {bus.availableSeats}</p>
      <p>Price Per Seat: {bus.priceperseat}</p>
    </div>
  );
};

export default BusDetails;
