export default function ReviewCard({
  review,
}) {
  return (
    <article className="review-card">
      <div className="review-header">
        <strong>
          {review.user?.name ||
            "Customer"}
        </strong>

        <span>
          {"⭐".repeat(
            Math.min(
              5,
              Math.max(
                1,
                review.rating || 1
              )
            )
          )}
        </span>
      </div>

      <p>
        {review.comment ||
          "No comment provided."}
      </p>
    </article>
  );
}
