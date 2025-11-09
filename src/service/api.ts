import axios from "axios";
import { Platform } from "react-native";

const API_URL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_API_URL_ANDROID
    : process.env.EXPO_PUBLIC_API_URL_LOCAL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    "User-Agent": "TakeID/1.0.0 (com.jhonatanffelipe.TakeID)",
  },
});

export default api;
