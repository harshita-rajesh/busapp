// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import About from './components/About';
import MyNavbar from './components/MyNavbar';
import OwnNavbar from './components/OwnNavbar';
import Forms from './components/Forms';
import Success from './components/Sucess';
import Displayusers from "./components/Displayusers"
import Update from "./components/Update"
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import Viewbusdetails from './components/Viewbusdetails';
import AdminDashboard from './components/Admindashboard';
import Userdashboard from './components/Userdashboard';
//import Booktickets from './components/Booktickets';
import Booktickets from './components/Booktickets';
import Ticketlist from './components/Ticketlist';
import Paymentform from './components/Paymentform';
import Finalizebooking from './components/Finalizebooking';
import ViewBuses from './components/Viewbuses';
import ticketdashboard from './components/ticketdashboard';
import DriverKYC from './components/DriverKYC';
import DriverWRS from './components/DriverWRS';




function App() {
  return (
    <Router>
      <OwnNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/new" element={<Forms />} />
        <Route path="/success" element={<Success />} />
        <Route path="/update/:id" element={<Update />} /> {/* New route for updating users */}
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/bus/" element={<ViewBuses />} />
        <Route path="/bus/:id" element={<Viewbusdetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/ticketdashboard/" element={<ticketdashboard />} />
        <Route path="/book/:id" element={<Booktickets />} />
        <Route path="/Booktickets" element={<Booktickets/>} />
        <Route path="/ticketlist" element={<Ticketlist/>} />
        <Route path="/success/:userId" element={<Finalizebooking/>} />
        <Route path="/driverkyc" element={<DriverKYC/>} />
        <Route path="/driverwrs" element={<DriverWRS/>} />



      </Routes>
    </Router>
  );
};

export default App;
