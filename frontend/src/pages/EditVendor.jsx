import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/vendors.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/vendors";

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    location: "",
    phone: "",
    email: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVendor();
  }, [id]);

  const fetchVendor = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch vendor data");
      }

      const data = await response.json();
      setFormData({
        businessName: data.businessName || "",
        category: data.category || "",
        location: data.location || "",
        phone: data.phone || "",
        email: data.email || "",
        image: data.image || "",
        description: data.description || "",
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load vendor details for editing.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update vendor");
      }

      alert("Vendor updated successfully!");
      navigate(`/vendors/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update vendor.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading vendor details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>{error}</h2>
        <Link to="/vendors">← Back to Vendors</Link>
      </div>
    );
  }

  return (
    <div className="vendor-form-page">
      <Link to={`/vendors/${id}`} className="back-link">
        ← Cancel & Back to Details
      </Link>

      <h1>Edit Vendor</h1>

      <form className="vendor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business Name *</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="save-vendor-btn"
          disabled={submitting}
        >
          {submitting ? "Saving Changes..." : "Update Vendor"}
        </button>
      </form>
    </div>
  );
};

export default EditVendor;