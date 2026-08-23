import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  vendorAPI,
} from "../services/api";

export default function EditVendor() {
  const { id } =
    useParams();

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

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    vendorAPI
      .getById(id)
      .then((data) => {
        const vendor =
          data.vendor || data;

        setForm({
          name:
            vendor.name || "",
          category:
            vendor.category ||
            "",
          description:
            vendor.description ||
            "",
          location:
            vendor.location ||
            "",
          phone:
            vendor.phone || "",
        });
      })
      .catch((error) => {
        setError(
          error.message ||
            "Unable to load vendor."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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

    setSaving(true);

    try {
      await vendorAPI.update(
        id,
        form
      );

      navigate(
        `/vendors/${id}`
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to update vendor."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <main className="page">
      <div className="form-container">
        <h1>
          Edit Vendor
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
            Name
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
            className="button"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
