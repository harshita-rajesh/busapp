import React, { useState } from 'react';

const ResetBus = () => {
  const [busId, setBusId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const resetBus = async () => {
    if (!busId) {
      setMessage('Please enter a valid Bus ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/buses/reset/${busId}`, { method: 'PUT' });

      // Check if response is okay
      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || 'Bus seats have been reset successfully!');
      } else {
        const result = await response.json();
        setMessage(result.message || 'Failed to reset bus seats.');
      }
    } catch (error) {
      setMessage('Failed to reset bus seats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Bus</h2>
      <input
        type="text"
        placeholder="Enter Bus ID"
        value={busId}
        onChange={(e) => setBusId(e.target.value)}
      />
      <button onClick={resetBus} disabled={loading}>
        {loading ? 'Resetting...' : 'Reset Seats'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetBus;
