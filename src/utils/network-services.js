import axios from "axios";
import { REFRESH_TOKEN } from "./apiroutes";

const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("access_token");
      // Don't attach token when calling refresh endpoint
      if (accessToken && config.url !== REFRESH_TOKEN) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refresh_token");

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        refreshToken &&
        originalRequest.url !== REFRESH_TOKEN // Prevent retrying the refresh endpoint
      ) {
        originalRequest._retry = true;
        try {
          const response = await axios.post(REFRESH_TOKEN, { refresh: refreshToken });
          const newAccessToken = response.data.access;

          // Store new token
          localStorage.setItem("access_token", newAccessToken);

          // Update Authorization header
          axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry original request
          return axios(originalRequest);
        } catch (refreshError) {
          // Clear tokens & redirect if refresh fails
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/#/login"; // optional: redirect to login
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
