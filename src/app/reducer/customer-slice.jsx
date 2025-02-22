import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCustomers = createAsyncThunk(
  "getCustomers",
  async (
    { id, auth = true, reservedetails = true, sales = true } = {},
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        auth: auth.toString(),
        reservedetails: reservedetails.toString(),
        sales: sales.toString(),
      }).toString();
      const res = id
        ? await axios.get(`/customer/${id}?${queryParams}`)
        : await axios.get(`/customer?${queryParams}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    cusData: [],
    cusLoading: false,
    cusError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.cusLoading = true;
        state.cusError = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.cusLoading = false;
        state.cusData = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.cusLoading = false;
        state.cusError = action.payload;
      });
  },
});

export default customerSlice.reducer;
