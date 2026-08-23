import AdvertisementCard from "./AdvertisementCard";

export default function AdvertisementList({
  advertisements,
}) {
  if (!advertisements.length) {
    return (
      <div className="empty-state">
        <h3>
          No advertisements yet
        </h3>

        <p>
          Create the first
          advertisement.
        </p>
      </div>
    );
  }

  return (
    <div className="advertisement-grid">
      {advertisements.map(
        (advertisement) => (
          <AdvertisementCard
            key={
              advertisement._id
            }
            advertisement={
              advertisement
            }
          />
        )
      )}
    </div>
  );
}
