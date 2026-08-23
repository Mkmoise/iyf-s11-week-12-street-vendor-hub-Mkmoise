import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>
            StreetVendorHub
          </h3>

          <p>
            Connecting street vendors
            with customers and their
            community.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">
            Home
          </Link>

          <Link to="/vendors">
            Vendors
          </Link>

          <Link to="/posts">
            Community
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        ©{" "}
        {new Date().getFullYear()}{" "}
        StreetVendorHub. All rights
        reserved.
      </div>
    </footer>
  );
}
