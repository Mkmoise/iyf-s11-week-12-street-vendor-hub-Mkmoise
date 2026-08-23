import { Link } from "react-router-dom";

export default function PostCard({
  post,
}) {
  const author =
    post.author?.name ||
    "Community Member";

  return (
    <article className="post-card">
      <div className="post-author">
        <div className="avatar">
          {author
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <strong>
            {author}
          </strong>

          <small>
            {post.createdAt
              ? new Date(
                  post.createdAt
                ).toLocaleDateString()
              : ""}
          </small>
        </div>
      </div>

      <h2>
        {post.title}
      </h2>

      <p>
        {post.content}
      </p>

      <Link
        to={`/posts/${post._id}`}
        className="text-link"
      >
        Read more →
      </Link>
    </article>
  );
}
