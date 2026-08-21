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
        />
      )}

      <div className="advertisement-card-content">

        <h3>{advertisement.title}</h3>

        <p className="advertisement-description">
          {advertisement.description}
        </p>

        <p className="advertisement-price">
          KSh {advertisement.price}
        </p>

        <p className="advertisement-detail">
          <strong>Category:</strong>{" "}
          {advertisement.category}
        </p>

        <p className="advertisement-detail">
          <strong>Location:</strong>{" "}
          {advertisement.location}
        </p>

        <span className="advertisement-status">
          {advertisement.status}
        </span>

        <div className="advertisement-actions">
          <button
            className="edit-button"
            onClick={() => onEdit(advertisement)}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(advertisement._id)}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdvertisementCard;