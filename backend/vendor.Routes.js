const express = require("express");
const router = express.Router();
const Vendor = require("./vendor"); // Your Mongoose model

// POST /api/vendors - Create a new vendor
router.post("/", async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/vendors - Fetch all vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;