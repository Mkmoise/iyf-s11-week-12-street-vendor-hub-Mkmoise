import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function AuthNav() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="auth-nav" aria-label="Account navigation">
      {isAuthenticated ? (
        <>
          <span className="auth-greeting">Hi, {user?.name}</span>
          <button className="auth-nav-button" onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link className="auth-nav-link" to="/login">Log in</Link>
          <Link className="auth-nav-link auth-nav-link-primary" to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}