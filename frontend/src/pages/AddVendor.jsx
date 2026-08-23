import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  vendorAPI,
} from "../services/api";

export default function AddVendor() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      category: "",
      description: "",
      location: "",
      phone: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    event
  ) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]:
        event.target.value,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
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
        <h1>
          Add Vendor
        </h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <label>
            Vendor Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>
            Category
          </label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Food, clothing, electronics..."
            required
          />

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={
              form.description
            }
            onChange={handleChange}
            rows="5"
          />

          <label>
            Location
          </label>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <label>
            Phone
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

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
