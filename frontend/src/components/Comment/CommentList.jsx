import Comment from "./Comment";

export default function CommentList({
  comments,
}) {
  if (!comments.length) {
    return (
      <p className="muted">
        No comments yet. Be the first
        to comment.
      </p>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
        />
      ))}
    </div>
  );
}
