function ReviewCard({ review, onDelete }) {
  return (
    <div className="review-card">
      <h3>{review.name}</h3>

      <p>
        <strong>Rating:</strong>{" "}
        {review.rating}/5
      </p>

      <p>{review.comment}</p>

      <button
        onClick={() => onDelete(review._id)}>
        Delete
      </button>
    </div>
  );
}

export default ReviewCard;