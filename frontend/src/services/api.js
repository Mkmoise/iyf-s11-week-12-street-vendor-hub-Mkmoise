const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

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

  getMe: () =>
    request("/auth/me"),
};

/* =========================
   USERS
========================= */

export const userAPI = {
  getProfile: (id) =>
    request(`/users/${id}`),

  updateProfile: (data) =>
    request("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

/* =========================
   VENDORS
========================= */

export const vendorAPI = {
  getAll: (search = "") =>
    request(
      `/vendors${
        search
          ? `?search=${encodeURIComponent(
              search
            )}`
          : ""
      }`
    ),

  getById: (id) =>
    request(`/vendors/${id}`),

  create: (data) =>
    request("/vendors", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/vendors/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/vendors/${id}`, {
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

  create: (data) =>
    request("/advertisements", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/advertisements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/advertisements/${id}`, {
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

  create: (data) =>
    request("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

/* =========================
   COMMENTS
========================= */

export const commentAPI = {
  getByPost: (postId) =>
    request(
      `/posts/${postId}/comments`
    ),

  create: (postId, content) =>
    request(
      `/posts/${postId}/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          content,
        }),
      }
    ),
};

/* =========================
   REVIEWS
========================= */

export const reviewAPI = {
  getByVendor: (vendorId) =>
    request(
      `/vendors/${vendorId}/reviews`
    ),

  create: (vendorId, data) =>
    request(
      `/vendors/${vendorId}/reviews`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),
};

export default {
  authAPI,
  userAPI,
  vendorAPI,
  advertisementAPI,
  postAPI,
  commentAPI,
  reviewAPI,
};
