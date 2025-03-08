import axiosAuth from "@/providers/axios-auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createApiThunk = (name, endpoint) => {
  return createAsyncThunk(
    name,
    async ({ id, ...params } = {}, { rejectWithValue }) => {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const url = id
          ? `${endpoint}/${id}?${queryParams}`
          : `${endpoint}?${queryParams}`;

        const response = await axiosAuth.get(url);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
};

export const createGenericSlice = (name, apiThunk) => {
  return createSlice({
    name,
    initialState: {
      data: [],
      loading: false,
      error: null,
      lastFetched: null, // ✅ Add a timestamp to track the last fetch
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(apiThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(apiThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload || [];
          state.lastFetched = Date.now(); // ✅ Store the last fetch time
        })
        .addCase(apiThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
};

// export const createGenericSlice = (name, apiThunk) => {
//   return createSlice({
//     name,
//     initialState: {
//       data: [],
//       loading: false,
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(apiThunk.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(apiThunk.fulfilled, (state, action) => {
//           state.loading = false;
//           state.data = action.payload || [];
//         })
//         .addCase(apiThunk.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         });
//     },
//   });
// };
