import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  postAPI,
} from "../services/api";

import PostList from "../components/Post/PostList";

export default function Posts() {
  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    postAPI
      .getAll()
      .then((data) => {
        setPosts(
          data.posts || data
        );
      })
      .catch((error) => {
        setError(
          error.message ||
            "Unable to load posts."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="eyebrow">
              COMMUNITY
            </p>

            <h1>
              Community Posts
            </h1>

            <p>
              Share ideas, experiences
              and stories.
            </p>
          </div>

          <Link
            to="/posts/create"
            className="button"
          >
            Create Post
          </Link>
        </div>

        {loading && (
          <div className="loading">
            Loading posts...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && (
          <PostList
            posts={posts}
          />
        )}
      </div>
    </main>
  );
}
