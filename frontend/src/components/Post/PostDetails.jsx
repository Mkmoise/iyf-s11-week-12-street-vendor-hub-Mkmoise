import {
  Link,
} from "react-router-dom";

import CommentList from "../Comment/CommentList";
import CommentForm from "../Comment/CommentForm";

export default function PostDetails({
  post,
  comments,
  onCommentCreated,
}) {
  const author =
    post.author?.name ||
    "Community Member";

  return (
    <article className="post-details">
      <Link
        to="/posts"
        className="back-link"
      >
        ← Back to posts
      </Link>

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
                ).toLocaleString()
              : ""}
          </small>
        </div>
      </div>

      <h1>
        {post.title}
      </h1>

      <div className="post-content">
        {post.content}
      </div>

      <section className="comments-section">
        <h2>
          Comments
        </h2>

        <CommentList
          comments={comments}
        />

        <CommentForm
          postId={post._id}
          onCommentCreated={
            onCommentCreated
          }
        />
      </section>
    </article>
  );
}
