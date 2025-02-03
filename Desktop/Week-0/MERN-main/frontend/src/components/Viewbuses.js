import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewBuses = () => {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/buses/');
        const result = await response.json();
        if (response.ok) {
          setBuses(result);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch buses.');
      }
    };

    fetchBuses();
  }, []);

  return (
    <div>
      <h2>All Buses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {buses.map((bus) => (
        <div key={bus._id}>
          <p><strong>Name:</strong> {bus.name}</p>
          <p><strong>From:</strong> {bus.from}</p>
          <p><strong>To:</strong> {bus.to}</p>
          

          {/* Button to navigate to the BusDetails page */}
          <Link to={`/bus/${bus._id}`}>
            <button>View Available Seats</button>
            
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ViewBuses;
