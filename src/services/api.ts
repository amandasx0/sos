import axios from "axios";

const api = axios.create({
  baseURL: "https://api-sos-b4gm.onrender.com",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

let isHandlingAuthError = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 400 && !isHandlingAuthError) {
      isHandlingAuthError = true;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.dispatchEvent(new Event("auth-expired"));
    }

    return Promise.reject(error);
  },
);

export default api;
