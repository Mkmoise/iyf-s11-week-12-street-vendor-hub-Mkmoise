import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";
import AddVendor from "./pages/AddVendor";
import EditVendor from "./pages/EditVendor";
import "./styles/vendors.css";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home route to /vendors */}
        <Route path="/" element={<Navigate to="/vendors" replace />} />

        {/* Static routes */}
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/add" element={<AddVendor />} />

        {/* Dynamic routes */}
        <Route path="/vendors/:id" element={<VendorDetails />} />
        <Route path="/vendors/edit/:id" element={<EditVendor />} />

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Navigate to="/vendors" replace />} />
      </Routes>

      <Dashboard />
    </BrowserRouter>
  );
}

export default App;