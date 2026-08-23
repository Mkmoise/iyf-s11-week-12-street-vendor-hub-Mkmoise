import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  advertisementAPI,
} from "../services/api";

import AdvertisementList from "../components/Advertisement/AdvertisementList";

export default function Advertisements() {
  const [
    advertisements,
    setAdvertisements,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    advertisementAPI
      .getAll()
      .then((data) => {
        setAdvertisements(
          data.advertisements ||
            data
        );
      })
      .catch((error) => {
        setError(
          error.message ||
            "Unable to load advertisements."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="eyebrow">
              MARKETPLACE
            </p>

            <h1>
              Advertisements
            </h1>

            <p>
              Discover products and
              services from local
              vendors.
            </p>
          </div>

          <Link
            to="/advertisements/create"
            className="button"
          >
            Create Advertisement
          </Link>
        </div>

        {loading && (
          <div className="loading">
            Loading...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && (
          <AdvertisementList
            advertisements={
              advertisements
            }
          />
        )}
      </div>
    </main>
  );
}
