import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/vendors.css';

export default function AddVendor() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Updated state: 'name' changed to 'businessName' to match Mongoose schema
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    category: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add vendor.');
      }

      // Success! Redirect to vendors page
      navigate('/vendors');
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Failed to add vendor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-vendor-page-wrapper">
      <div className="add-vendor-card">
        <Link to="/vendors" className="back-link">
          ← Back to Vendors
        </Link>

        <div className="form-header">
          <h2>Add New Vendor</h2>
          <p>Fill out the details below to register a vendor.</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form className="vendor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="businessName">Vendor / Business Name</label>
            <input
              id="businessName"
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Street Bite Catering"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="vendor@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0758263525"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Food & Beverages">Food & Beverages</option>
              <option value="Apparel & Crafts">Apparel & Crafts</option>
              <option value="Services">Services</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location / Address</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Nairobi"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of products or services..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Add Vendor'}
          </button>
        </form>
      </div>
    </div>
  );
}