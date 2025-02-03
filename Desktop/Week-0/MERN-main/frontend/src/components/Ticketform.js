import React from 'react';

const Ticketform = ({ seatNumber, setSeatNumber, seatPrice, totalPrice, handleBooking, loading, message }) => {
  return (
    <div>
      <h1>Book a Ticket</h1>
      <form onSubmit={handleBooking}>
        <div>
          <label>Seat Number:</label>
          <input
            type="number"
            value={seatNumber}
            onChange={(e) => setSeatNumber(Number(e.target.value))}
            placeholder="Enter Seat Number"
            min="1"
            required
          />
        </div>

        {/* Display price details */}
        <div>
          <p>Price per seat: ${seatPrice}</p>
          <p>Total price: ${totalPrice}</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Book Ticket'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Ticketform;
