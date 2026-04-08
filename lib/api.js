import axios from "axios";
import { clearAuthSession } from "./auth-storage";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://spiruveda-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token safely on client side
API.interceptors.request.use(
  (req) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      clearAuthSession();
    }
    return Promise.reject(error);
  }
);

export default API;
