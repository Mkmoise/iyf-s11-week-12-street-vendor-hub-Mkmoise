import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authAPI } from "../services/api";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .getMe()
      .then((data) => {
        setUser(
          data.user || data
        );
      })
      .catch(() => {
        localStorage.removeItem(
          "token"
        );
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (
    credentials
  ) => {
    const data =
      await authAPI.login(
        credentials
      );

    if (!data.token) {
      throw new Error(
        "Login failed: no token returned."
      );
    }

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(
      data.user || null
    );

    return data;
  };

  const register = async (
    userData
  ) => {
    const data =
      await authAPI.register(
        userData
      );

    if (!data.token) {
      throw new Error(
        "Registration failed: no token returned."
      );
    }

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(
      data.user || null
    );

    return data;
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated:
          Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
