import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBuses = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [error, setError] = useState(null);

  // Fetch buses when the component mounts
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('/api/buses'); // Adjust API URL if necessary
        setBuses(response.data);
      } catch (err) {
        setError('Failed to fetch buses');
      }
    };

    fetchBuses();
  }, []);

  // Handle selecting a bus to view its details and available seats
  const handleBusSelect = async (busId) => {
    try {
      const response = await axios.get(`/api/buses/${busId}`); // Get details of the selected bus
      setSelectedBus(response.data);
    } catch (err) {
      setError('Failed to fetch bus details');
    }
  };

  const handleResetSeats = async (busId) => {
    try {
      await axios.post(`/api/buses/${busId}/reset`); // Reset available seats to total seats
      // Fetch the updated bus details after reset
      const response = await axios.get(`/api/buses/${busId}`);
      setSelectedBus(response.data);
    } catch (err) {
      setError('Failed to reset bus seats');
    }
  };

  return (
    <div>
      <h2>View Available Buses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Select a Bus:</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {buses.map((bus) => (
            <button key={bus._id} onClick={() => handleBusSelect(bus._id)}>
              {bus.name}
            </button>
          ))}
        </div>
      </div>

      {selectedBus && (
        <div>
          <h3>{selectedBus.name} - Available Seats</h3>
          <p>From: {selectedBus.from} | To: {selectedBus.to}</p>
          <p>Total Seats: {selectedBus.totalSeats}</p>
          <p>Available Seats: {selectedBus.availableSeats}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 30px)', gap: '5px' }}>
            {/* Display seats */}
            {Array.from({ length: selectedBus.totalSeats }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: index < selectedBus.availableSeats ? 'green' : 'red', // Green for available, red for occupied
                  borderRadius: '5px',
                  textAlign: 'center',
                  color: 'white',
                  lineHeight: '30px',
                }}
              >
                {index < selectedBus.availableSeats ? 'A' : 'O'}
              </div>
            ))}
          </div>

          <button onClick={() => handleResetSeats(selectedBus._id)}>Reset Seats</button>
        </div>
      )}
    </div>
  );
};

export default ViewBuses;
