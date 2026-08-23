import { Link } from "react-router-dom";

export default function AdvertisementCard({
  advertisement,
}) {
  return (
    <article className="advertisement-card">
      <div>
        <span className="ad-badge">
          Advertisement
        </span>

        <h3>
          {advertisement.title}
        </h3>

        <p>
          {advertisement.description}
        </p>

        <strong className="ad-price">
          KSh{" "}
          {Number(
            advertisement.price || 0
          ).toLocaleString()}
        </strong>

        <p className="ad-location">
          📍{" "}
          {advertisement.location ||
            "Location not provided"}
        </p>
      </div>

      <Link
        to={`/advertisements/${advertisement._id}`}
        className="button"
      >
        View Advertisement
      </Link>
    </article>
  );
}
