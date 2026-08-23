import VendorCard from "./VendorCard";

export default function VendorList({
  vendors,
}) {
  if (!vendors.length) {
    return (
      <div className="empty-state">
        <h3>
          No vendors found
        </h3>

        <p>
          Try another search or add
          the first vendor.
        </p>
      </div>
    );
  }

  return (
    <div className="vendor-grid">
      {vendors.map((vendor) => (
        <VendorCard
          key={vendor._id}
          vendor={vendor}
        />
      ))}
    </div>
  );
}
