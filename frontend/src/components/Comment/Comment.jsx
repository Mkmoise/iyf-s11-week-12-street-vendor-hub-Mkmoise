export default function Comment({
  comment,
}) {
  const author =
    comment.author?.name ||
    "Community Member";

  return (
    <article className="comment">
      <div className="avatar small-avatar">
        {author
          .charAt(0)
          .toUpperCase()}
      </div>

      <div>
        <strong>
          {author}
        </strong>

        <small>
          {comment.createdAt
            ? new Date(
                comment.createdAt
              ).toLocaleString()
            : ""}
        </small>

        <p>
          {comment.content}
        </p>
      </div>
    </article>
  );
}
