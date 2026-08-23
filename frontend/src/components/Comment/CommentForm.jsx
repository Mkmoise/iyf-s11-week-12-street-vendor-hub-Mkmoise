import {
  useState,
} from "react";

import {
  commentAPI,
} from "../../services/api";

export default function CommentForm({
  postId,
  onCommentCreated,
}) {
  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data =
        await commentAPI.create(
          postId,
          content.trim()
        );

      onCommentCreated(
        data.comment || data
      );

      setContent("");
    } catch (error) {
      setError(
        error.message ||
          "Unable to add comment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="comment-form"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <textarea
        value={content}
        onChange={(event) =>
          setContent(
            event.target.value
          )
        }
        placeholder="Write a comment..."
        rows="4"
        required
      />

      <button
        className="button"
        disabled={loading}
      >
        {loading
          ? "Commenting..."
          : "Add Comment"}
      </button>
    </form>
  );
}
