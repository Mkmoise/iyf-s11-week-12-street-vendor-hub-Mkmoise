import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  vendorAPI,
} from "../services/api";

import VendorList from "../components/Vendor/VendorList";

export default function Vendors() {
  const [vendors, setVendors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadVendors = async (
    searchTerm = ""
  ) => {
    try {
      setLoading(true);
      setError("");

      const data =
        await vendorAPI.getAll(
          searchTerm
        );

      setVendors(
        data.vendors || data
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to load vendors."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleSearch = (
    event
  ) => {
    event.preventDefault();

    loadVendors(search);
  };

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="eyebrow">
              STREETVENDORS
            </p>

            <h1>
              Find Local Vendors
            </h1>

            <p>
              Discover businesses and
              products in your community.
            </p>
          </div>

          <Link
            to="/vendors/add"
            className="button"
          >
            Add Vendor
          </Link>
        </div>

        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search vendors..."
          />

          <button
            type="submit"
            className="button"
          >
            Search
          </button>
        </form>

        {loading && (
          <div className="loading">
            Loading vendors...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && (
          <VendorList
            vendors={vendors}
          />
        )}
      </div>
    </main>
  );
}
