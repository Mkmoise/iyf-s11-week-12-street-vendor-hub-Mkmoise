function AdvertisementCard({
  advertisement,
  onEdit,
  onDelete,
}) {
  return (
    <div className="advertisement-card">
      {advertisement.image && (
        <img
          src={advertisement.image}
          alt={advertisement.title}
          width="200"
        />
      )}

      <h3>{advertisement.title}</h3>

      <p>{advertisement.description}</p>

      <p>
        <strong>Price:</strong> KSh{" "}
        {advertisement.price}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {advertisement.category}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {advertisement.location}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {advertisement.status}
      </p>

      <button
        onClick={() => onEdit(advertisement)}
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(advertisement._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default AdvertisementCard;