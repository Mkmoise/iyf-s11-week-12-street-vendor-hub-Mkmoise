import { useEffect, useState } from "react";

import AdvertisementCard from "../components/AdvertisementCard";
import ReviewCard from "../components/ReviewCard";

import CreateAdvertisement from "./CreateAdvertisement";
import EditAdvertisement from "./EditAdvertisement";

function Dashboard() {
  const [advertisements, setAdvertisements] =
    useState([]);

  const [reviews, setReviews] = useState([]);

  const [showCreate, setShowCreate] =
    useState(false);

  const [selectedAdvertisement, setSelectedAdvertisement] =
    useState(null);

  const [reviewForm, setReviewForm] = useState({
    advertisement: "",
    name: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetchAdvertisements();
    fetchReviews();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/advertisements"
      );

      const data = await response.json();

      setAdvertisements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/reviews"
      );

      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdvertisementCreated = (
    advertisement
  ) => {
    setAdvertisements((previous) => [
      advertisement,
      ...previous,
    ]);

    setShowCreate(false);
  };

  const handleAdvertisementUpdated = (
    updatedAdvertisement
  ) => {
    setAdvertisements((previous) =>
      previous.map((advertisement) =>
        advertisement._id ===
        updatedAdvertisement._id
          ? updatedAdvertisement
          : advertisement
      )
    );

    setSelectedAdvertisement(null);
  };

  const handleDeleteAdvertisement = async (
    id
  ) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/advertisements/${id}',
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete advertisement"
        );
      }

      setAdvertisements((previous) =>
        previous.filter(
          (advertisement) =>
            advertisement._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewChange = (event) => {
    setReviewForm({
      ...reviewForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateReview = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...reviewForm,
            rating: Number(reviewForm.rating),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create review");
      }

      const newReview = await response.json();

      setReviews((previous) => [
        newReview,
        ...previous,
      ]);

      setReviewForm({
        advertisement: "",
        name: "",
        rating: 5,
        comment: "",
      });
    } catch (error) {
      console.error(error);
      alert("Could not create review");
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/reviews/${id}',
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete review"
        );
      }

      setReviews((previous) =>
        previous.filter(
          (review) => review._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Advertisements & Reviews</h1>

      <button
        onClick={() =>
          setShowCreate(!showCreate)
        }
      >
        {showCreate
          ? "Close"
          : "Create Advertisement"}
      </button>

      {showCreate && (
        <CreateAdvertisement
          onAdvertisementCreated={
            handleAdvertisementCreated
          }
        />
      )}

      {selectedAdvertisement && (
        <EditAdvertisement
          advertisement={
            selectedAdvertisement
          }
          onAdvertisementUpdated={
            handleAdvertisementUpdated
          }
          onCancel={() =>
            setSelectedAdvertisement(null)
          }
        />
      )}

      <hr />

      <h2>Advertisements</h2>

      {advertisements.length === 0 ? (
        <p>No advertisements yet.</p>
      ) : (
        advertisements.map(
          (advertisement) => (
            <AdvertisementCard
              key={advertisement._id}
              advertisement={advertisement}
              onEdit={
                setSelectedAdvertisement
              }
              onDelete={
                handleDeleteAdvertisement
              }
            />
          )
        )
      )}

      <hr />

      <h2>Add Review</h2>

      <form onSubmit={handleCreateReview}>
        <select
          name="advertisement"
          value={reviewForm.advertisement}
          onChange={handleReviewChange}
          required
        >
          <option value="">
            Select Advertisement
          </option>

          {advertisements.map(
            (advertisement) => (
              <option
                key={advertisement._id}
                value={advertisement._id}
              >
                {advertisement.title}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={reviewForm.name}
          onChange={handleReviewChange}
          required
        />

        <select
          name="rating"
          value={reviewForm.rating}
          onChange={handleReviewChange}
        >
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <textarea
          name="comment"
          placeholder="Write your review"
          value={reviewForm.comment}
          onChange={handleReviewChange}
          required
        />

        <button type="submit">
          Submit Review
        </button>
      </form>

      <h2>Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onDelete={handleDeleteReview}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;