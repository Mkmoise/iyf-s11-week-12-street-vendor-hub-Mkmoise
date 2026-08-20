import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Components
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";
import AddVendor from "./pages/AddVendor";
import EditVendor from "./pages/EditVendor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Styles
import "./App.css";
import "./styles/vendors.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Core General Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Vendor Routes */}
            <Route path="/vendors" element={<Vendors />} />

            <Route
              path="/vendors/add"
              element={
                <ProtectedRoute>
                  <AddVendor />
                </ProtectedRoute>
              }
            />

            <Route path="/vendors/:id" element={<VendorDetails />} />

            <Route
              path="/vendors/edit/:id"
              element={
                <ProtectedRoute>
                  <EditVendor />
                </ProtectedRoute>
              }
            />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;