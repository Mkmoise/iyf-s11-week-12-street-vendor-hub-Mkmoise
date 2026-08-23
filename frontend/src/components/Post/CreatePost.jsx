import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  postAPI,
} from "../../services/api";

export default function CreatePost() {
  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data =
        await postAPI.create({
          title: title.trim(),
          content: content.trim(),
        });

      const post =
        data.post || data;

      navigate(
        `/posts/${post._id}`
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to create post."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <label>
        Title
      </label>

      <input
        value={title}
        onChange={(event) =>
          setTitle(
            event.target.value
          )
        }
        maxLength={150}
        required
      />

      <label>
        Content
      </label>

      <textarea
        value={content}
        onChange={(event) =>
          setContent(
            event.target.value
          )
        }
        rows="10"
        required
      />

      <button
        className="button"
        disabled={loading}
      >
        {loading
          ? "Publishing..."
          : "Publish Post"}
      </button>
    </form>
  );
}
