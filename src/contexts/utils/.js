import axiosInstance from "@/lib/axios-instance";
import CryptoJS from "crypto-js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SECRET_KEY = import.meta.env.VITE_APP_CACHE_KEY;

const saveToSessionStorage = (key, value) => {
  try {
    const dataString = JSON.stringify(value);

    const encryptedData = CryptoJS.AES.encrypt(
      dataString,
      SECRET_KEY
    ).toString();

    sessionStorage.setItem(key, encryptedData);
  } catch (e) {
    console.error("Error saving to sessionStorage:", e);
  }
};

const getFromSessionStorage = (key) => {
  try {
    const encryptedData = sessionStorage.getItem(key);
    if (!encryptedData) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData);
  } catch (e) {
    console.error("Error reading from sessionStorage:", e);
    return null;
  }
};

export const createApiThunk = (name, endpoint, save = true) => {
  return createAsyncThunk(
    name,
    async ({ id, ...params } = {}, { rejectWithValue }) => {
      const storageKey = `${name}_data`;
      const storedData = getFromSessionStorage(storageKey);
      const cacheExpiration = 12 * 60 * 60 * 1000;

      if (
        storedData &&
        storedData.data &&
        storedData.data.length > 0 &&
        Date.now() - storedData.lastFetched < cacheExpiration
      ) {
        return { data: storedData.data, meta: storedData.meta };
      }

      try {
        const queryParams = new URLSearchParams(params).toString();
        const url = id
          ? `${endpoint}/${id}?${queryParams}`
          : `${endpoint}?${queryParams}`;

        const response = await axiosInstance.get(url);
        const { data, meta } = response.data;

        if (save)
          saveToSessionStorage(storageKey, {
            data,
            meta,
            lastFetched: Date.now(),
          });

        return { data, meta };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
};

export const createGenericSlice = (name, apiThunk) => {
  const storageKey = `${apiThunk.typePrefix}_data`;
  const storedData = getFromSessionStorage(storageKey);

  return createSlice({
    name,
    initialState: {
      data: storedData?.data || [],
      meta: storedData?.meta || { total: 0, page: 1, limit: 0, totalPages: 0 },
      loading: false,
      error: null,
      lastFetched: storedData?.lastFetched || null,
    },
    reducers: {
      clearCache: (state) => {
        state.data = [];
        state.meta = { total: 0, page: 1, limit: 0, totalPages: 0 };
        state.lastFetched = null;
        sessionStorage.removeItem(storageKey);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(apiThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(apiThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data || [];
          state.meta = action.payload.meta || {
            total: 0,
            page: 1,
            limit: 0,
            totalPages: 0,
          };
          state.lastFetched = Date.now();
        })
        .addCase(apiThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
};
