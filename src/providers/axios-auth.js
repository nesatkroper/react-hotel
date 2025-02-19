import axios from "axios";
import Cookies from "js-cookie";
import { apiKey } from "./api";

const axiosAuth = axios.create({
  baseURL: apiKey,
  headers: {
    "content-type": "application/json",
  },
});

axiosAuth.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosAuth;
