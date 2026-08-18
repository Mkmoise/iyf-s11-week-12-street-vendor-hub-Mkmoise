require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const vendorsRouter = require("./vendor.Routes");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/streetvendorhub";

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to StreetVendorHub API 🚀");
});

// Vendor API Routes
app.use("/api/vendors", vendorsRouter);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });