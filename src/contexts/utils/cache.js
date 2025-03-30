import localForage from "localforage";
import { encrypt, decrypt } from "./cryption";

const _KEY = import.meta.env.VITE_APP_CACHE_KEY || "-key";
const _ENCRYPT = true;

const storage = localForage.createInstance({
  name: "reserve-cache",
  storeName: "api_responses",
  description: "Cached API responses",
});

export const saveToCache = async (key, value) => {
  try {
    await storage.setItem(key, {
      encrypted: true,
      payload: encrypt(value, _KEY, _ENCRYPT),
      lastFetched: Date.now(),
    });
  } catch (e) {
    console.error("Error saving to cache:", e);
    throw e;
  }
};

export const getFromCache = async (key) => {
  try {
    const cached = await storage.getItem(key);
    if (!cached) return null;
    return cached.encrypted
      ? decrypt(cached.payload, _KEY, _ENCRYPT)
      : cached.payload;
  } catch (e) {
    console.error("Error reading from cache:", e);
    return null;
  }
};
