import React from 'react';

function About() {
  return (
    <div className="about-container">
      {/* Header Banner */}
      <header className="about-header">
        <h1>About StreetVendorHub</h1>
        <p className="subtitle">
          Bridging the gap between street vendors and local communities through accessible digital solutions.
        </p>
      </header>

      {/* Mission & Vision Section */}
      <section className="about-mission-grid">
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To empower informal traders and street micro-enterprises by providing digital tools that increase their visibility, expand their customer base, and foster economic growth.
          </p>
        </div>

        <div className="card">
          <h2>Our Vision</h2>
          <p>
            An inclusive economy where local street vendors seamlessly connect with urban consumers, leveraging modern web technology to build sustainable livelihoods.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values">
        <h2>What Drives Us</h2>
        <ul>
          <li>
            <strong>Community Empowerment:</strong> Supporting local entrepreneurs and grassroots commerce.
          </li>
          <li>
            <strong>Accessibility:</strong> Building lightweight, easy-to-use interfaces for all user devices.
          </li>
          <li>
            <strong>Economic Inclusion:</strong> Bringing informal market traders into the digital space.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default About;