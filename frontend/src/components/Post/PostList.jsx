import PostCard from "./PostCard";

export default function PostList({
  posts,
}) {
  if (!posts.length) {
    return (
      <div className="empty-state">
        <h2>
          No posts yet
        </h2>

        <p>
          Be the first person to
          share with the community.
        </p>
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
}
