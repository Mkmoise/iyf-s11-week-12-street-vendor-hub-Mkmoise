import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  advertisementAPI,
} from "../../services/api";

export default function CreateAdvertisement() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      price: "",
      location: "",
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
      const data =
        await advertisementAPI.create(
          {
            ...form,
            price: Number(
              form.price
            ),
          }
        );

      const ad =
        data.advertisement ||
        data;

      navigate(
        `/advertisements/${ad._id}`
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to create advertisement."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <label>
        Title
      </label>

      <input
        name="title"
        value={form.title}
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
        required
      />

      <label>
        Price
      </label>

      <input
        name="price"
        type="number"
        min="0"
        value={form.price}
        onChange={handleChange}
        required
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

      <button
        className="button"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Advertisement"}
      </button>
    </form>
  );
}
