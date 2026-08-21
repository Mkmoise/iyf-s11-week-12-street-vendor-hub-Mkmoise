import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      // send them back where they were headed, or default to /vendors
      const redirectTo = location.state?.from?.pathname || "/vendors";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-heading">
          <p className="auth-eyebrow">Street Vendor Hub</p>
          <h1>Welcome back</h1>
          <p>Log in to discover and manage local vendors.</p>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <label htmlFor="email">Email</label>
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

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="auth-input"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}