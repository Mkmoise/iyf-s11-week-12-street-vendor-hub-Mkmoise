import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="logo"
        >
          StreetVendorHub
        </Link>

        <nav className="nav-links">
          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/vendors">
            Vendors
          </NavLink>

          <NavLink to="/advertisements">
            Advertisements
          </NavLink>

          <NavLink to="/posts">
            Community
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>
        </nav>

        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="profile-link"
              >
                {user?.name ||
                  "Profile"}
              </Link>

              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link
                to="/register"
                className="register-button"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
