import { useState } from "react";
import { commentAPI } from "../../services/api";

export default function CommentForm({
  postId,
  onCommentCreated,
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await commentAPI.create(
  postId,
  {
    content: trimmedContent,
  }
);

      onCommentCreated(data.comment || data);

      setContent("");
    } catch (error) {
      console.error("Comment error:", error);

      setError(
        error.message || "Unable to add comment."
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
          setContent(event.target.value)
        }
        placeholder="Write a comment..."
        rows="4"
        required
        disabled={loading}
      />

      <button
        type="submit"
        className="button"
        disabled={loading || !content.trim()}
      >
        {loading
          ? "Commenting..."
          : "Add Comment"}
      </button>
    </form>
  );
}
