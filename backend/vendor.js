const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "Food & Beverages", "Electronics"
    location: { type: String, required: true },
    description: { type: String },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);