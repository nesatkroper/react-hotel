import axiosInstance from "@/providers/axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getFromLocalStorage = (key) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const createApiThunk = (name, endpoint) => {
  return createAsyncThunk(
    name,
    async ({ id, ...params } = {}, { rejectWithValue }) => {
      const storageKey = `${name}_data`;
      const storedData = getFromLocalStorage(storageKey);
      const cacheExpiration = 5 * 60 * 1000;

      if (
        storedData &&
        storedData.data &&
        storedData.data.length > 0 &&
        Date.now() - storedData.lastFetched < cacheExpiration
      ) {
        return { data: storedData.data, meta: storedData.meta };
      }

      if (storedData && storedData.data && storedData.data.length > 0) {
        return { data: storedData.data, meta: storedData.meta };
      }

      try {
        const queryParams = new URLSearchParams(params).toString();
        const url = id
          ? `${endpoint}/${id}?${queryParams}`
          : `${endpoint}?${queryParams}`;

        const response = await axiosInstance.get(url);
        const { data, meta } = response.data;

        saveToLocalStorage(storageKey, { data, meta, lastFetched: Date.now() });
        return { data, meta };
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
};

export const createGenericSlice = (name, apiThunk) => {
  const storageKey = `${apiThunk.typePrefix}_data`;
  const storedData = getFromLocalStorage(storageKey);

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
        localStorage.removeItem(storageKey);
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
