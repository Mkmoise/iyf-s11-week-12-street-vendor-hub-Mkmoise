import { Link } from "react-router-dom";

export default function VendorCard({
  vendor,
}) {
  return (
    <article className="vendor-card">
      <div className="vendor-card-body">
        <h3>
          {vendor.name}
        </h3>

        <p>
          {vendor.description ||
            "Local street vendor"}
        </p>

        <div className="vendor-meta">
          <span>
            📍{" "}
            {vendor.location ||
              "Location not provided"}
          </span>

          <span>
            🏷️{" "}
            {vendor.category ||
              "General"}
          </span>
        </div>

        <Link
          to={`/vendors/${vendor._id}`}
          className="button"
        >
          View Vendor
        </Link>
      </div>
    </article>
  );
}
