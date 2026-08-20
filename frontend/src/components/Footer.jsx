import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Summary */}
        <div className="footer-section brand-info">
          <h3>StreetVendorHub</h3>
          <p>
            Empowering local micro-enterprises and connecting communities through accessible digital solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="footer-section contact-info">
          <h4>Support</h4>
          <p>Email: support@streetvendorhub.com</p>
          <p>Location: Nairobi, Kenya</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} StreetVendorHub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;