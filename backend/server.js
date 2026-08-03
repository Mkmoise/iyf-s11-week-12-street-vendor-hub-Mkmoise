const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to StreetVendorHub API 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
