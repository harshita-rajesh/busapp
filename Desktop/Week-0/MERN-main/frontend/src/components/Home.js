import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Home() {
  const navigate = useNavigate(); // Hook for navigation

  const styles = {
    homepage: {
      backgroundImage: 'url("https://source.unsplash.com/1600x900/?bus,travel")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
    },
    content: {
      background: 'rgba(0, 0, 0, 0.6)',
      padding: '30px',
      borderRadius: '10px',
    },
    heading: {
      fontSize: '3rem',
      marginBottom: '10px',
    },
    paragraph: {
      fontSize: '1.2rem',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#ff5722',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.1rem',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#e64a19',
    },
  };

  const handleBookNow = () => {
    navigate('/Userlogin'); // Redirect to the login page
  };

  return (
    <div style={styles.homepage}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to EasyBus!</h1>
        <p style={styles.paragraph}>
          Your one-stop solution for booking bus tickets effortlessly.
        </p>
        <p style={styles.paragraph}>
          Travel across the country with the best deals and comfortable rides. Book your ticket today!
        </p>
        <button
          style={styles.button}
          onClick={handleBookNow}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Home;
