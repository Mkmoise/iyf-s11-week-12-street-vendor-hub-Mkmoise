import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import "../styles/vendors.css"; // Fixed relative CSS import path

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Category State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Updated Categories Array
  const categories = [
    'All Categories',
    'Food & Beverages',
    'Clothing & Apparel',
    'Handmade & Crafts',
    'Fresh Produce',
    'Services',
  ];

  // Fetch vendors from backend API
  const fetchVendors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      if (
        selectedCategory &&
        selectedCategory !== 'All Categories' &&
        selectedCategory.toLowerCase() !== 'all'
      ) {
        params.append('category', selectedCategory);
      }

      const queryString = params.toString();
      const url = `${API_BASE_URL}/api/vendors${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server status: ${response.status}`);
      }

      const data = await response.json();
      setVendors(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to load vendors.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  // Debounced search trigger on state change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVendors();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchVendors]);

  // Handle vendor deletion
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this vendor?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/vendors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete vendor");
      }

      setVendors((prev) => prev.filter((vendor) => (vendor._id || vendor.id) !== id));
      alert("Vendor deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete vendor.");
    }
  };

  return (
    <div className="vendors-page container">
      {/* Page Header */}
      <div className="vendors-header">
        <h1 className="vendors-title">Local Vendors</h1>
        <p className="vendors-subtitle">
          Discover and support local businesses in your community.
        </p>
        <Link to="/vendors/add" className="add-vendor-btn">
          + Add New Vendor
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search vendors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content States */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading vendors...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>{error}</p>
          <button className="try-again-btn" onClick={fetchVendors}>
            Try Again
          </button>
        </div>
      ) : vendors.length === 0 ? (
        <div className="empty-state">
          <p>No vendors found matching your criteria.</p>
        </div>
      ) : (
        <div className="vendors-grid">
          {vendors.map((vendor) => {
            const vendorId = vendor._id || vendor.id;
            return (
              <div key={vendorId} className="vendor-card">
                <div className="vendor-image">
                  <img
                    src={vendor.image || "https://via.placeholder.com/300x200"}
                    alt={vendor.businessName || vendor.name || "Vendor image"}
                  />
                  <span className="category-badge">
                    {vendor.category || 'General'}
                  </span>
                </div>

                <div className="vendor-info">
                  <h3 className="vendor-name">
                    {vendor.businessName || vendor.name || 'Unnamed Vendor'}
                  </h3>

                  <p className="vendor-location">
                    📍 {vendor.location || "Location not provided"}
                  </p>

                  <p className="vendor-description">
                    {vendor.description
                      ? vendor.description.substring(0, 100) + "..."
                      : "No description provided."}
                  </p>

                  <div className="vendor-buttons">
                    <Link to={`/vendors/${vendorId}`} className="view-vendor-btn">
                      View
                    </Link>
                    <Link to={`/vendors/edit/${vendorId}`} className="edit-vendor-btn">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(vendorId)}
                      className="delete-vendor-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}