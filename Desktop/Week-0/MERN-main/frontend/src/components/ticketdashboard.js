import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update this to match your backend URL

export const bookTicket = async (busId, userId, seatNumber) => {
  return axios.post(`${API_BASE_URL}/tickets/${busId}/book`, { userId, seatNumber });
};

export const viewTickets = async (userId) => {
  return axios.get(`${API_BASE_URL}/tickets/view`, { params: { userId } });
};

export const cancelTicket = async (ticketId) => {
  return axios.delete(`${API_BASE_URL}/tickets/cancel/${ticketId}`);
};

export const fetchBusDetails = async (busId) => {
  return axios.get(`${API_BASE_URL}/buses/${busId}`);
};
