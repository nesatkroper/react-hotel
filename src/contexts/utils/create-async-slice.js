import axiosInstance from "@/lib/axios-instance";
import localForage from "localforage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFromCache, saveToCache } from "./cache";

const storage = localForage.createInstance({
  name: "reserve-cache",
  storeName: "api_responses",
  description: "Cached API responses",
});

const clearCacheItem = async (key) => {
  try {
    await storage.removeItem(key);
  } catch (e) {
    console.error("Error clearing cache item:", e);
  }
};

export const createClearCacheThunk = (prefix) =>
  createAsyncThunk(`${prefix}/clearCache`, async () => {
    try {
      const keys = await storage.keys();
      await Promise.all(
        keys.map((key) =>
          key.startsWith(`${prefix}_`)
            ? storage.removeItem(key)
            : Promise.resolve()
        )
      );
    } catch (e) {
      console.error("Failed to clear cache:", e);
      throw e;
    }
  });

export const createApiThunk = (name, endpoint, options = {}) => {
  const {
    cacheEnabled = true,
    cacheExpiration = 12 * 60 * 60 * 1000,
    invalidateOnMutation = true,
  } = options;

  return createAsyncThunk(
    name,
    async (
      { id, params = {}, payload, method = "GET" } = {},
      { rejectWithValue }
    ) => {
      const cacheKey = `${name}_${id || ""}_${JSON.stringify(params)}`;

      if (cacheEnabled && method === "GET") {
        const cachedData = await getFromCache(cacheKey);
        if (
          cachedData &&
          Date.now() - cachedData.lastFetched < cacheExpiration
        ) {
          return cachedData.data;
        }
      }

      try {
        let response;
        const queryParams = new URLSearchParams(params).toString();

        switch (method) {
          case "GET": {
            const url = id
              ? `${endpoint}/${id}?${queryParams}`
              : `${endpoint}?${queryParams}`;
            response = await axiosInstance.get(url);

            break;
          }
          case "POST":
            response = await axiosInstance.post(endpoint, payload);
            break;
          case "PUT":
            response = await axiosInstance.put(`${endpoint}/${id}`, payload);
            break;
          case "DELETE":
            response = await axiosInstance.delete(`${endpoint}/${id}`);
            if (invalidateOnMutation) {
              await clearCacheItem(`${name}_data`);
            }
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        const apiData = response.data?.data || response.data;
        const result = {
          data: Array.isArray(apiData) ? apiData : [apiData],
          meta: response.data?.meta || {
            total: response.data?.data?.length || 0,
            page: 1,
            limit: 10,
            totalPages: 0,
          },
        };

        if (cacheEnabled && method === "GET") {
          await saveToCache(cacheKey, result);
        }

        return result;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
};

export const createGenericSlice = (name, apiThunk, initialState = {}) => {
  const clearCacheThunk = createClearCacheThunk(apiThunk.typePrefix);

  const initialCacheState = {
    data: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    loading: false,
    error: null,
    lastFetched: null,
    ...initialState,
  };

  const slice = createSlice({
    name,
    initialState: initialCacheState,
    reducers: {
      clearCache: (state) => {
        Object.assign(state, initialCacheState);
      },
      updateItem: (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...action.payload };
        }
      },
      addItem: (state, action) => {
        state.data.unshift(action.payload);
        state.meta.total += 1;
      },
      removeItem: (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
        state.meta.total = Math.max(0, state.meta.total - 1);
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
          state.meta = action.payload.meta || initialCacheState.meta;
          state.lastFetched = Date.now();
        })
        .addCase(apiThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(clearCacheThunk.pending, (state) => {
          state.loading = true;
        })
        .addCase(clearCacheThunk.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(clearCacheThunk.rejected, (state) => {
          state.loading = false;
        });
    },
  });

  return {
    ...slice,
    clearCacheAsync: clearCacheThunk,
  };
};
