import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorAPI } from "../services/api";

export default function AddVendor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    category: "",
    description: "",
    location: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await vendorAPI.create(form);

      navigate("/vendors");
    } catch (error) {
      setError(
        error.message ||
          "Unable to create vendor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="form-container">
        <h1>Add Vendor</h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="form"
          onSubmit={handleSubmit}
        >
          {/* Vendor Name */}
          <label>
            Vendor Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter vendor's name"
            required
          />

          {/* Business Name */}
          <label>
            Business Name
          </label>

          <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="e.g. Mama's Fresh Bites"
            required
          />

          {/* Category */}
          <label>
            Category
          </label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Food, clothing, electronics..."
            required
          />

          {/* Description */}
          <label>
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the vendor's products or services"
            rows="5"
          />

          {/* Location */}
          <label>
            Location
          </label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Mwiki, Nairobi"
            required
          />

          {/* Phone */}
          <label>
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 0712345678"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="button"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Add Vendor"}
          </button>
        </form>
      </div>
    </main>
  );
      }
  );
}
