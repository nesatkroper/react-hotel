import axios from "axios";
import Cookies from "js-cookie";
import { apiKey } from "./api";

const axiosInstance = axios.create({
  baseURL: apiKey,
  headers: {
    "content-type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
