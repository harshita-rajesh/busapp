import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Booktickets from './Booktickets';

const ViewBusDetails = () => {
    const [busDetails, setBusDetails] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Get bus ID from URL params
    //console.log(id)
    const navigate = useNavigate();

    // Fetch bus details when the component loads
    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/buses/${id}`);
                setBusDetails(response.data); // Set bus details from response
            } catch (err) {
                console.error('Error fetching bus details:', err);
                setError('Failed to fetch bus details.');
            }
        };

        fetchBusDetails();
    }, [id]);

    const handleBookTickets = () => {
        navigate(`/book/${id}`); // Navigate to the ticket booking page
    };

    return (
        <div>
            <Container className="mt-5">
                <h2 className="mb-4">Bus Details</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {busDetails ? (
                    <Table striped bordered hover responsive>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{busDetails.name}</td>
                            </tr>
                            <tr>
                                <td><strong>From</strong></td>
                                <td>{busDetails.from}</td>
                            </tr>
                            <tr>
                                <td><strong>To</strong></td>
                                <td>{busDetails.to}</td>
                            </tr>
                            <tr>
                                <td><strong>Total Seats</strong></td>
                                <td>{busDetails.totalSeats}</td>
                            </tr>
                            <tr>
                                <td><strong>Available Seats</strong></td>
                                <td>{busDetails.availableSeats}</td>
                            </tr>
                            <tr>
                                <td><strong>Ticket Price (per seat)</strong></td>
                                <td>{busDetails.priceperseat}</td>
                            </tr>
                        </tbody>
                    </Table>
                ) : (
                    <p>Loading bus details...</p>
                )}
                <div className="mt-3">
                    <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
                    <Button variant="primary" onClick={handleBookTickets}>Book Tickets</Button>
                </div>
            </Container>
        </div>
    );
};

export default ViewBusDetails;
