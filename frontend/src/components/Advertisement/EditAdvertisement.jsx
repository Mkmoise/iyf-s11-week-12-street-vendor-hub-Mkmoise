import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  advertisementAPI,
} from "../../services/api";

export default function EditAdvertisement() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      price: "",
      location: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    advertisementAPI
      .getById(id)
      .then((data) => {
        const ad =
          data.advertisement ||
          data;

        setForm({
          title:
            ad.title || "",
          description:
            ad.description ||
            "",
          price:
            ad.price || "",
          location:
            ad.location || "",
        });
      })
      .catch((error) => {
        setError(
          error.message ||
            "Unable to load advertisement."
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
      await advertisementAPI.update(
        id,
        {
          ...form,
          price: Number(
            form.price
          ),
        }
      );

      navigate(
        `/advertisements/${id}`
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to update advertisement."
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
        disabled={saving}
      >
        {saving
          ? "Saving..."
          : "Save Changes"}
      </button>
    </form>
  );
}
