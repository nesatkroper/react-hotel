import axios from "axios";
import Cookies from "js-cookie";
import { apiKey } from "../constants/api";

const axiosAuth = axios.create({
  baseURL: apiKey,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
      }
    } else if (error.request)
      console.error("No response received:", error.request);
    else console.error("Request error:", error.message);

    return Promise.reject(error);
  }
);

export default axiosAuth;
