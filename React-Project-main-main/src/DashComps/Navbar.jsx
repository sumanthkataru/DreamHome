// Navbar.jsx

import React from 'react';
import './Navbar.css';

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Your Logo</div>
      <div className="navbar-items">
        <div className="navbar-item" onClick={() => alert('Home Clicked')}>
          Home
        </div>
        <div className="navbar-item" onClick={() => alert('About Clicked')}>
          About
        </div>
        <div className="navbar-item" onClick={() => alert('Contact Clicked')}>
          Contact
        </div>
        <div className="navbar-item" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
