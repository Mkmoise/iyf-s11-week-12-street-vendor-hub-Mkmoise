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
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/vendors.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect home route to /vendors */}
        <Route path="/" element={<Navigate to="/vendors" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Static routes */}
        <Route path="/vendors" element={<Vendors />} />
        <Route
          path="/vendors/add"
          element={
            <ProtectedRoute>
              <AddVendor />
            </ProtectedRoute>
          }
        />

        {/* Dynamic routes */}
        <Route path="/vendors/:id" element={<VendorDetails />} />
        <Route path="/vendors/edit/:id" element={<EditVendor />} />

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Navigate to="/vendors" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;