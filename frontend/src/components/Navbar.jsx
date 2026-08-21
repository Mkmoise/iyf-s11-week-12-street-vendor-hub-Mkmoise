import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // Imports the navbar styling

function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar">
        {/* Brand Logo / Title */}
        <div className="navbar-brand">
          <Link to="/" className="brand-logo">
            <span className="brand-title">StreetVendorHub</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/street-vendors"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Street Vendors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;