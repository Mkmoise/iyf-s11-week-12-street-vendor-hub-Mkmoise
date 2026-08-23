import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      console.log("Registration successful:", user);

      navigate("/vendors", {
        replace: true,
      });
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-heading">
          <p className="auth-eyebrow">
            Street Vendor Hub
          </p>

          <h1>Create your account</h1>

          <p>
            Join the community and find your next local favorite.
          </p>
        </div>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <label htmlFor="name">
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          className="auth-input"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className="auth-input"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          className="auth-input"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
    }
