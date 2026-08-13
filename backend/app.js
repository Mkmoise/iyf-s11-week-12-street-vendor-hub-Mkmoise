// backend/app.js
const express = require('express');
const cors = require('cors'); // CORS is needed to allow your frontend to talk to your backend.

// 1. Create the Express application instance.
const app = express();

// 2. Import your route modules.
const vendorRoutes = require('./vendor.Routes');

// 3. Setup Middleware.
app.use(cors()); // Allow cross-origin requests.
app.use(express.json()); // Allow the app to read JSON data sent in request bodies.

// 4. Mount your routes.
// Every URL that starts with /api/vendors will use vendor.Routes.js.
app.use('/api/vendors', vendorRoutes);

// You can add more routes here, e.g., app.use('/api/products', productRoutes);

// 5. Setup a default test route.
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Street Vendor Hub API!" });
});

// 6. Export the configured 'app' instance so server.js can start it.
module.exports = app;