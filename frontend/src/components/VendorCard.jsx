import React from "react";
import { Link } from "react-router-dom";
import "../styles/vendors.css";

const VendorCard = ({ vendor = {}, onDelete }) => {
  const vendorId = vendor._id || vendor.id;

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${vendor.businessName || "this vendor"}?`
    );

    if (confirmed && onDelete) {
      onDelete(vendorId);
    }
  };

  return (
    <div className="vendor-card">
      <div className="vendor-image">
        <img
          src={vendor.image || "https://via.placeholder.com/300x200"}
          alt={vendor.businessName || "Vendor image"}
        />
        <span className="category-badge">
          {vendor.category || "General"}
        </span>
      </div>

      <div className="vendor-info">
        <h3>{vendor.businessName || "Unnamed Vendor"}</h3>

        <p className="vendor-location">
          📍 {vendor.location || "Location not provided"}
        </p>

        <p className="vendor-description">
          {vendor.description
            ? vendor.description.substring(0, 100) + "..."
            : "No description available."}
        </p>

        <div className="vendor-buttons">
          <Link to={`/vendors/${vendorId}`} className="view-vendor-btn">
            View
          </Link>
          <Link to={`/vendors/edit/${vendorId}`} className="edit-vendor-btn">
            Edit
          </Link>
          <button onClick={handleDelete} className="delete-vendor-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;