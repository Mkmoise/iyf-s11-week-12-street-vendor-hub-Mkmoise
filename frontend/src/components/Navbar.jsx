import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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
          >
            Home
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
