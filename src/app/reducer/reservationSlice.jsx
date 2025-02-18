import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getReservation = createAsyncThunk(
  "getReservation",
  async ({ id, details = false } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        details: details.toString(),
      }).toString();

      const res = id
        ? await axios.get(`/reservation/${id}?${queryParams}`)
        : await axios.get(`/reservation?${queryParams}`);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    resData: [],
    resLoading: false,
    resError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservation.pending, (state) => {
        state.resLoading = true;
        state.resError = null;
      })
      .addCase(getReservation.fulfilled, (state, action) => {
        state.resLoading = false;
        state.resData = action.payload;
      })
      .addCase(getReservation.rejected, (state, action) => {
        state.resLoading = false;
        state.resError = action.payload;
      });
  },
});

export default reservationSlice.reducer;
