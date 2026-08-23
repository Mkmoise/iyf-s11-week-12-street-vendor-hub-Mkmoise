import CreatePostComponent from "../components/Post/CreatePost";

export default function CreatePost() {
  return (
    <main className="page">
      <div className="form-container">
        <p className="eyebrow">
          COMMUNITY
        </p>

        <h1>
          Create a Post
        </h1>

        <CreatePostComponent />
      </div>
    </main>
  );
}
