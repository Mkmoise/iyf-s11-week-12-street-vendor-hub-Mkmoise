import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to StreetVendorHub</h1>
        <p>Connecting local street vendors with customer communities seamlessly.</p>
        <div className="hero-buttons">
          <Link to="/vendors" className="btn btn-primary">
            Explore Vendors
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </section>

      {/* Highlights / Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <h3>Discover Local Vendors</h3>
          <p>Find fresh produce, street food, and everyday essentials nearby.</p>
        </div>
        <div className="feature-card">
          <h3>Empower Local Markets</h3>
          <p>Support informal micro-enterprises directly in your neighborhood.</p>
        </div>
        <div className="feature-card">
          <h3>Real-Time Updates</h3>
          <p>Stay updated on operational hours and live vendor locations.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;