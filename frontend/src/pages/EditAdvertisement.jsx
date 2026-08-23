import EditAdvertisementComponent from "../components/Advertisement/EditAdvertisement";

export default function EditAdvertisement() {
  return (
    <main className="page">
      <div className="form-container">
        <p className="eyebrow">
          MARKETPLACE
        </p>

        <h1>
          Edit Advertisement
        </h1>

        <EditAdvertisementComponent />
      </div>
    </main>
  );
}
