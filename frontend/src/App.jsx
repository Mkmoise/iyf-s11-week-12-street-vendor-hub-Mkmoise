import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";
import AddVendor from "./pages/AddVendor";
import EditVendor from "./pages/EditVendor";

import Advertisements from "./pages/Advertisements";
import CreateAdvertisement from "./pages/CreateAdvertisement";
import EditAdvertisement from "./pages/EditAdvertisement";

import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            {/* GENERAL */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* AUTH */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* PROFILE */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* VENDORS */}

            <Route
              path="/vendors"
              element={<Vendors />}
            />

            <Route
              path="/vendors/:id"
              element={
                <VendorDetails />
              }
            />

            <Route
              path="/vendors/add"
              element={
                <ProtectedRoute>
                  <AddVendor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vendors/edit/:id"
              element={
                <ProtectedRoute>
                  <EditVendor />
                </ProtectedRoute>
              }
            />

            {/* ADVERTISEMENTS */}

            <Route
              path="/advertisements"
              element={
                <Advertisements />
              }
            />

            <Route
              path="/advertisements/create"
              element={
                <ProtectedRoute>
                  <CreateAdvertisement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/advertisements/edit/:id"
              element={
                <ProtectedRoute>
                  <EditAdvertisement />
                </ProtectedRoute>
              }
            />

            {/* POSTS */}

            <Route
              path="/posts"
              element={<Posts />}
            />

            <Route
              path="/posts/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/posts/:id"
              element={
                <PostDetails />
              }
            />

            {/* FALLBACK */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
