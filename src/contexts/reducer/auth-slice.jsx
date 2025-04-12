import axiosAuth from "@/lib/axios-auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAuth = createAsyncThunk("getAuth", async () => {
  const res = await axiosAuth.get("/auth/all-auth");
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: [],
    authLoading: false,
    authError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuth.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(getAuth.fulfilled, (state, action) => {
        state.authLoading = false;
        state.authData = action.payload;
      })
      .addCase(getAuth.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload;
      });
  },
});

export default authSlice.reducer;
