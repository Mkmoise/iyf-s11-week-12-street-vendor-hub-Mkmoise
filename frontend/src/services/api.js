const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Get JWT token from browser storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

// Reusable request function
const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Try to read JSON response
    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    // Give a clearer message when backend is not running
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }

    throw error;
  }
};

// Authentication API
export const authAPI = {
  // Register
  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  // Login
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  // Get currently logged-in user
  getMe: () => request("/auth/me"),
};

// Vendor API
export const vendorAPI = {
  getAll: (query = "") => request(`/vendors${query}`),

  getById: (id) => request(`/vendors/${id}`),

  create: (vendorData) =>
    request("/vendors", {
      method: "POST",
      body: JSON.stringify(vendorData),
    }),

  update: (id, vendorData) =>
    request(`/vendors/${id}`, {
      method: "PUT",
      body: JSON.stringify(vendorData),
    }),

  delete: (id) =>
    request(`/vendors/${id}`, {
      method: "DELETE",
    }),
};
