import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem("token");
     
      const message = error.response?.data?.message || "";
      const isTokenInvalid =
        !token ||
        message === "Token is not valid" ||
        message === "No token, authorization denied";

      if (isTokenInvalid) {
        localStorage.removeItem("token");
        if (!window.location.pathname.includes("/signin")) {
          window.location.href = "/signin";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;