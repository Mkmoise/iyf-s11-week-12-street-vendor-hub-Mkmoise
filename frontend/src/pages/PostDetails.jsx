import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  postAPI,
  commentAPI,
} from "../services/api";

import PostDetailsComponent from "../components/Post/PostDetails";

export default function PostDetails() {
  const { id } =
    useParams();

  const [post, setPost] =
    useState(null);

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    Promise.all([
      postAPI.getById(id),
      commentAPI.getByPost(id),
    ])
      .then(
        ([
          postData,
          commentData,
        ]) => {
          setPost(
            postData.post ||
              postData
          );

          setComments(
            commentData.comments ||
              commentData
          );
        }
      )
      .catch((error) => {
        setError(
          error.message ||
            "Unable to load post."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleCommentCreated =
    (comment) => {
      setComments(
        (previous) => [
          ...previous,
          comment,
        ]
      );
    };

  if (loading) {
    return (
      <div className="loading">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="error-message">
          {error}
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="page">
        <div className="empty-state">
          Post not found.
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container narrow">
        <PostDetailsComponent
          post={post}
          comments={comments}
          onCommentCreated={
            handleCommentCreated
          }
        />
      </div>
    </main>
  );
}
