import {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { login } =
    useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        email: email
          .trim()
          .toLowerCase(),
        password,
      });

      const destination =
        location.state?.from
          ?.pathname || "/posts";

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Login failed."
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
        Welcome Back
      </h1>

      <p>
        Login to your
        StreetVendorHub account.
      </p>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <label htmlFor="email">
        Email
      </label>

      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) =>
          setEmail(
            event.target.value
          )
        }
        required
      />

      <label htmlFor="password">
        Password
      </label>

      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) =>
          setPassword(
            event.target.value
          )
        }
        required
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Logging in..."
          : "Login"}
      </button>

      <p className="auth-switch">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </form>
  );
}
