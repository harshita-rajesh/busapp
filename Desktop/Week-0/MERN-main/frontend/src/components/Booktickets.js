import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [busId, setBusId] = useState(""); // Dynamically fetched Bus ID
  const [userId, setUserId] = useState(""); // Dynamically fetched User ID
  const [numSeats, setNumSeats] = useState(1); // Number of seats to book
  const [price, setPrice] = useState(0); // Price per seat
  const [totalPrice, setTotalPrice] = useState(0); // Total price calculation
  const [ticketDetails, setTicketDetails] = useState(null); // To store booked ticket details
  const [message, setMessage] = useState(""); // Status message

  // Fetch user and bus details from the backend
  const fetchInitialData = async () => {
    try {
      // Fetch user details (replace `/api/user` with your actual backend endpoint)
      const userResponse = await axios.get("/api/user");
      setUserId(userResponse.data.userId);

      // Fetch bus details (replace `/api/bus` with your actual backend endpoint)
      const busResponse = await axios.get("/api/bus");
      setBusId(busResponse.data.busId);
      setPrice(busResponse.data.pricePerSeat);

      setMessage("Fetched user and bus details successfully.");
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setMessage("Failed to fetch user or bus details.");
    }
  };

  // Function to book tickets for multiple seats
  const handleBookTickets = async () => {
    try {
      const response = await axios.post(`/api/tickets/book/${busId}`, {
        userId,
        numSeats,
      });

      // Set the ticket details to display after booking
      const bookedTicket = response.data.ticket; // Assuming the response has the ticket details
      setTicketDetails(bookedTicket);

      setMessage(`${numSeats} ticket(s) booked successfully!`);

      // Calculate total price
      const calculatedTotalPrice = numSeats * price;
      setTotalPrice(calculatedTotalPrice);

    } catch (error) {
      console.error("Error booking tickets:", error);
      setMessage("Failed to book tickets.");
    }
  };

  // Function to view tickets and update total price
  const handleViewTickets = async () => {
    try {
      const response = await axios.get(`/api/tickets?userId=${userId}`);
      const fetchedTickets = response.data;

      if (fetchedTickets.length === 0) {
        setMessage("No tickets found.");
      } else {
        setTicketDetails(fetchedTickets[0]); // Assuming user can have only 1 ticket for simplicity
        setMessage("Tickets retrieved successfully.");

        // Calculate total price based on fetched tickets
        const calculatedTotalPrice = fetchedTickets.length * price;
        setTotalPrice(calculatedTotalPrice);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setMessage("Failed to retrieve tickets.");
    }
  };

  // Function to cancel the booked ticket
  const handleCancelTicket = async () => {
    try {
      // Assuming the backend has an endpoint to cancel a ticket using the ticketId
      const response = await axios.delete(`/api/tickets/${ticketDetails.ticketId}`);

      // Clear ticket details after cancellation
      setTicketDetails(null);
      setMessage("Ticket canceled successfully.");

      // Reset the price details
      setTotalPrice(0);
      setNumSeats(1);
    } catch (error) {
      console.error("Error canceling ticket:", error);
      setMessage("Failed to cancel ticket.");
    }
  };

  useEffect(() => {
    fetchInitialData(); // Fetch user and bus details on component mount
  }, []);

  return (
    <div>
      <h1>Bus Ticket Booking</h1>

      {/* Book Ticket Section */}
      <div>
        <h2>Book Tickets</h2>
        <input
          type="number"
          placeholder="Number of Seats"
          value={numSeats}
          onChange={(e) => setNumSeats(e.target.value)}
          min="1"
        />
        <button onClick={handleBookTickets}>Book Tickets</button>
      </div>

      {/* View Ticket Section */}
      <div>
        <h2>View Tickets</h2>
        <button onClick={handleViewTickets}>View My Tickets</button>
      </div>

      {/* Display Ticket Details After Booking */}
      <div>
        {ticketDetails && (
          <div>
            <h2>Your Ticket Information</h2>
            <p><strong>Bus Name:</strong> {ticketDetails.busName}</p>
            <p><strong>From:</strong> {ticketDetails.from}</p>
            <p><strong>To:</strong> {ticketDetails.to}</p>
            <p><strong>Price per seat:</strong> {price}</p>
            <p><strong>Total Price:</strong> {totalPrice}</p>
            <p><strong>Seat Numbers:</strong> {ticketDetails.seatNumbers.join(", ")}</p>

            {/* Cancel Ticket Button */}
            <button onClick={handleCancelTicket}>Cancel Ticket</button>
          </div>
        )}
      </div>

      {/* Status and Message */}
      <div>
        <h2>Status</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default App;
