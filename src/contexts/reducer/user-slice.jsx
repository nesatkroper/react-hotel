import Cookies from "js-cookie";
import axiosAuth from "@/lib/axios-auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("getUser", async () => {
  const res = await axiosAuth.get("/auth/me");
  Cookies.set("employee", res.data);

  return res?.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    usrData: [],
    usrLoading: false,
    usrError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.usrLoading = true;
        state.usrError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.usrLoading = false;
        state.usrData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.usrLoading = false;
        state.usrError = action.payload;
      });
  },
});

export default userSlice.reducer;
