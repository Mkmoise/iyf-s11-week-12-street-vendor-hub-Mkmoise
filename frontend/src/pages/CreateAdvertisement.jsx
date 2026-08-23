import CreateAdvertisementComponent from "../components/Advertisement/CreateAdvertisement";

export default function CreateAdvertisement() {
  return (
    <main className="page">
      <div className="form-container">
        <p className="eyebrow">
          MARKETPLACE
        </p>

        <h1>
          Create Advertisement
        </h1>

        <CreateAdvertisementComponent />
      </div>
    </main>
  );
}
