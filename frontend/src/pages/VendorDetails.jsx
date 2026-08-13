import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/vendors.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/vendors";

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVendor();
  }, [id]);

  const fetchVendor = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Vendor not found");
      }

      const data = await response.json();
      setVendor(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load vendor details.");
    } finally {
      setLoading(false);
    }
  };

  const deleteVendor = async () => {
    const vendorName = vendor?.businessName || "this vendor";
    const confirmed = window.confirm(
      `Are you sure you want to delete ${vendorName}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete vendor");
      }

      alert("Vendor deleted successfully.");
      navigate("/vendors");
    } catch (error) {
      console.error(error);
      alert("Failed to delete vendor.");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading vendor...</h2>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="error">
        <h2>{error || "Vendor not found."}</h2>
        <Link to="/vendors">← Back to Vendors</Link>
      </div>
    );
  }

  const vendorId = vendor._id || vendor.id;

  return (
    <div className="vendor-details-page">
      <Link to="/vendors" className="back-link">
        ← Back to Vendors
      </Link>

      <div className="vendor-details-card">
        <div className="vendor-details-image">
          <img
            src={vendor.image || "https://via.placeholder.com/600x400"}
            alt={vendor.businessName || "Vendor"}
          />
        </div>

        <div className="vendor-details-content">
          <h1>{vendor.businessName || "Unnamed Vendor"}</h1>

          <p>
            <strong>Category:</strong> {vendor.category || "General"}
          </p>

          <p>
            <strong>Location:</strong> {vendor.location || "Not specified"}
          </p>

          <h2>About the Business</h2>
          <p>{vendor.description || "No description available."}</p>

          {vendor.phone && (
            <p>
              <strong>Phone:</strong> {vendor.phone}
            </p>
          )}

          {vendor.email && (
            <p>
              <strong>Email:</strong> {vendor.email}
            </p>
          )}

          <div className="vendor-actions">
            <Link to={`/vendors/edit/${vendorId}`} className="edit-vendor-btn">
              Edit Vendor
            </Link>

            <button onClick={deleteVendor} className="delete-vendor-btn">
              Delete Vendor
            </button>

            {vendor.phone && (
              <a href={`tel:${vendor.phone}`} className="contact-btn">
                Call Vendor
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;