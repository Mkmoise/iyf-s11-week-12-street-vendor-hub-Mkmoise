import {
  Link,
} from "react-router-dom";

export default function VendorDetails({
  vendor,
}) {
  if (!vendor) {
    return null;
  }

  return (
    <section className="vendor-details">
      <p className="eyebrow">
        VENDOR
      </p>

      <h1>
        {vendor.name}
      </h1>

      <p className="vendor-description">
        {vendor.description ||
          "No description available."}
      </p>

      <div className="vendor-info">
        <p>
          <strong>
            Category:
          </strong>{" "}
          {vendor.category ||
            "Not specified"}
        </p>

        <p>
          <strong>
            Location:
          </strong>{" "}
          {vendor.location ||
            "Not specified"}
        </p>

        <p>
          <strong>
            Phone:
          </strong>{" "}
          {vendor.phone ||
            "Not provided"}
        </p>
      </div>

      <Link
        to="/vendors"
        className="button secondary-button"
      >
        ← Back to Vendors
      </Link>
    </section>
  );
}
