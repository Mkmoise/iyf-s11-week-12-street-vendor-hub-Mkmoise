import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function RegisterForm() {
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { register } =
    useAuth();

  const navigate =
    useNavigate();

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      await register({
        name: form.name.trim(),
        email: form.email
          .trim()
          .toLowerCase(),
        password: form.password,
      });

      navigate("/posts", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >
      <h1>
        Create Account
      </h1>

      <p>
        Join the
        StreetVendorHub community.
      </p>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <label htmlFor="name">
        Full Name
      </label>

      <input
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="register-email">
        Email
      </label>

      <input
        id="register-email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="register-password">
        Password
      </label>

      <input
        id="register-password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        minLength={6}
        required
      />

      <label htmlFor="confirmPassword">
        Confirm Password
      </label>

      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={
          form.confirmPassword
        }
        onChange={handleChange}
        minLength={6}
        required
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Register"}
      </button>

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
