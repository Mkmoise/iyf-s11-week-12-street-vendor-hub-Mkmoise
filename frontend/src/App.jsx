import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

<<<<<<< HEAD
// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Vendors from './pages/Vendors';
import VendorDetails from './pages/VendorDetails';
import AddVendor from './pages/AddVendor';
import EditVendor from './pages/EditVendor';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Styles
import './App.css';
import './styles/vendors.css';
=======
import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";
import AddVendor from "./pages/AddVendor";
import EditVendor from "./pages/EditVendor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthNav from "./components/AuthNav";
import "./styles/vendors.css";
import Dashboard from "./pages/Dashboard";

>>>>>>> origin

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* Core General Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
=======
      <AuthNav />
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
>>>>>>> origin

            {/* Vendor Management Routes */}
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/add" element={<AddVendor />} />
            <Route path="/vendors/:id" element={<VendorDetails />} />
            <Route path="/vendors/edit/:id" element={<EditVendor />} />

<<<<<<< HEAD
            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
=======
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<Navigate to="/vendors" replace />} />
      </Routes>

      <Dashboard />
>>>>>>> origin
    </BrowserRouter>
  );
}

export default App;