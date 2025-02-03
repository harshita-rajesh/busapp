import React from 'react'
import { Link } from 'react-router-dom';
import "./css/OwnNavbar.css"
const OwnNavbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">BusApp</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/userlogin">User</Link>
        </li>
        <li>
          <Link to="/adminlogin">Admin</Link>
        </li>
      </ul>
    </nav>
  )
}

export default OwnNavbar