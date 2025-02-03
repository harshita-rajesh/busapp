// src/components/Home.js
import React, { useEffect, useState } from 'react';
// frontend/src/components/UserList.js
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/user') // This will be proxied to http://localhost:5000/api/home
      .then((response) => {
        return response.json(); // Parse the JSON from the backend response
      })
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data from backend');
      });
  }, []);

  return (
          <Container className="mt-5">
              <h2 className="mb-4">User List</h2>
              
              <div className="mt-3">
                  <Link to="/admin">
                      <Button variant="primary">Admin</Button>
                  </Link>
                  <Link to="/new">
                      <Button variant="primary">User</Button>
                  </Link>
              </div>
          </Container>
      );
  };
  
export default User;
