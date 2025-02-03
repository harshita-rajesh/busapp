import React, { useState } from 'react';
import BusForm from '../components/Busform';
import ViewBuses from '../components/Viewbuses';
import DriverKYC from '../components/DriverKYC';
import DriverWRS from '../components/DriverWRS';


const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'addBus':
        return <BusForm />;
      case 'viewBus':
        return <ViewBuses />;
      case 'driverkyc':
        return <DriverKYC />;
      case 'driverwrs':
        return <DriverWRS />;
      default:
        return <p>Please select an action from the buttons above.</p>;
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveComponent('addBus')}>
          Add New Bus
        </button>
        <button onClick={() => setActiveComponent('viewBus')}>
          View All Buses
        </button>
        <button onClick={() => setActiveComponent('driverkyc')}>
          Add driver(Without RS)
        </button>
        <button onClick={() => setActiveComponent('driverwrs')}>
          Add driver( With RS)
        </button>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
