import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .getMe()
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Session check failed:", error);
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Login
  const login = async (credentials) => {
    const data = await authAPI.login(credentials);

    if (!data.token) {
      throw new Error("Login succeeded but no token was returned.");
    }

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data.user;
  };

  // Register
  const register = async (userData) => {
    const data = await authAPI.register(userData);

    if (!data.token) {
      throw new Error("Registration succeeded but no token was returned.");
    }

    localStorage.setItem("token", data.token);
    setUser(data.user);

    return data.user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
    }
