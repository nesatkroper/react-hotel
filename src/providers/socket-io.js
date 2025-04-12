import { io } from "socket.io-client";
import { apiUrl } from "@/constants/api";

export const SOCKET = io(apiUrl, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});
