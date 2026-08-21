import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Vendors from './pages/Vendors';
import VendorDetails from './pages/VendorDetails';
import AddVendor from './pages/AddVendor';
import EditVendor from './pages/EditVendor';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Layout & Protected Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthNav from './components/AuthNav';
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './App.css';
import './styles/vendors.css';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <AuthNav />

        <main className="main-content">
          <Routes>
            {/* Core General Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Vendor Management Routes */}
            <Route path="/street-vendors" element={<Vendors />} />
            <Route path="/vendors" element={<Navigate to="/street-vendors" replace />} />

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