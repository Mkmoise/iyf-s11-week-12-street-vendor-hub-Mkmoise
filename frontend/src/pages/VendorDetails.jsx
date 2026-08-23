import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  vendorAPI,
} from "../services/api";

import VendorDetailsComponent from "../components/Vendor/VendorDetails";

import ReviewCard from "../components/Review/ReviewCard";

export default function VendorDetails() {
  const { id } =
    useParams();

  const [vendor, setVendor] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await vendorAPI.getById(
            id
          );

        setVendor(
          data.vendor || data
        );
      } catch (error) {
        setError(
          error.message ||
            "Unable to load vendor."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <div className="loading">
          Loading vendor...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="error-message">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <VendorDetailsComponent
          vendor={vendor}
        />

        <section className="reviews-section">
          <h2>
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="muted">
              No reviews yet.
            </p>
          ) : (
            reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
              />
            ))
          )}
        </section>

        <Link
          to="/vendors"
          className="back-link"
        >
          ← All Vendors
        </Link>
      </div>
    </main>
  );
}
