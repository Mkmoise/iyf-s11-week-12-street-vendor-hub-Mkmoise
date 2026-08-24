const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, config);

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("fetch")
    ) {
      throw new Error(
        "Unable to connect to StreetVendorHub server."
      );
    }

    throw error;
  }
};

/* =========================
   AUTH
========================= */

export const authAPI = {
  register: (userData) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getProfile: () =>
    request("/auth/profile"),

  updateProfile: (profileData) =>
    request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
};

/* =========================
   USER
========================= */

export const userAPI = {
  getProfile: () =>
    request("/auth/profile"),

  updateProfile: (profileData) =>
    request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
};

/* =========================
   VENDORS
========================= */

export const vendorAPI = {
  getAll: (query = "") =>
    request(`/vendors${query}`),

  getById: (id) =>
    request(`/vendors/${id}`),

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

/* =========================
   POSTS
========================= */

export const postAPI = {
  getAll: () =>
    request("/posts"),

  getById: (id) =>
    request(`/posts/${id}`),

  create: (postData) =>
    request("/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    }),

  update: (id, postData) =>
    request(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
    }),

  delete: (id) =>
    request(`/posts/${id}`, {
      method: "DELETE",
    }),
};

/* =========================
   COMMENTS
========================= */

export const commentAPI = {
  getByPost: (postId) =>
    request(`/comments/post/${postId}`),

  create: (postId, commentData) =>
    request(`/comments/post/${postId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
    }),

  delete: (id) =>
    request(`/comments/${id}`, {
      method: "DELETE",
    }),
};

/* =========================
   ADVERTISEMENTS
========================= */

export const advertisementAPI = {
  getAll: () =>
    request("/advertisements"),

  getById: (id) =>
    request(`/advertisements/${id}`),

  create: (advertisementData) =>
    request("/advertisements", {
      method: "POST",
      body: JSON.stringify(advertisementData),
    }),

  update: (id, advertisementData) =>
    request(`/advertisements/${id}`, {
      method: "PUT",
      body: JSON.stringify(advertisementData),
    }),

  delete: (id) =>
    request(`/advertisements/${id}`, {
      method: "DELETE",
    }),
};
