import React, { useState } from 'react';
import BusDetails from '../components/Busdetails';
import ViewBuses from '../components/Viewbuses';

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = () => {
    switch (activeComponent) {
      // case 'viewBusDetails':
      //   return <BusDetails />;
      case 'viewBuses':
        return <ViewBuses />;
      default:
        return <p>Please select the button above to view the buses</p>;
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        
        <button onClick={() => setActiveComponent('viewBuses')}>
          View Buses
        </button>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default UserDashboard;
