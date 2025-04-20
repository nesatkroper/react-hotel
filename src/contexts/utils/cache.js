import localForage from "localforage";
import { encrypt, decrypt } from "./cryption";

const _KEY = import.meta.env.VITE_APP_CACHE_KEY || "-key";
const _ENCRYPT = false; // Or false to disable encryption for testing

const storage = localForage.createInstance({
  name: "reserve-cache",
  storeName: "api_responses",
  description: "Cached API responses",
});

export const saveToCache = async (key, value) => {
  try {
    console.log(`[saveToCache] Attempting to save Key: ${key}`, value);
    const payloadToStore = _ENCRYPT ? encrypt(value, _KEY, _ENCRYPT) : value;

    if (_ENCRYPT && payloadToStore === null) {
      console.error("Encryption failed for key:", key);
      return;
    }

    const itemToStore = {
      payload: payloadToStore,
      lastFetched: Date.now(),
      encrypted: _ENCRYPT,
    };

    await storage.setItem(key, itemToStore);
    console.log(`[saveToCache] Key: ${key}, Stored successfully:`, itemToStore);
  } catch (e) {
    console.error("Error saving to cache:", key, e);
  }
};

export const getFromCache = async (key) => {
  try {
    const cachedItem = await storage.getItem(key);
    // console.log(
    //   `[getFromCache] Key: ${key}, Raw Cached Item from storage:`,
    //   cachedItem
    // );

    if (!cachedItem || !cachedItem.payload || !cachedItem.lastFetched) {
      console.log(
        `[getFromCache] Key: ${key}, Cache miss or invalid structure.`
      );
      return null;
    }

    const decryptedData = cachedItem.encrypted
      ? decrypt(cachedItem.payload, _KEY, _ENCRYPT)
      : cachedItem.payload;

    // console.log(`[getFromCache] Key: ${key}, Decrypted Data:`, decryptedData);

    if (cachedItem.encrypted && decryptedData === null) {
      console.warn(
        `[getFromCache] Key: ${key}, Decryption failed. Treating as cache miss.`
      );

      return null;
    }

    return {
      data: decryptedData,
      lastFetched: cachedItem.lastFetched,
    };
  } catch (e) {
    console.error("Error reading from cache:", key, e);
    return null;
  }
};
