import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCloseShift = createAsyncThunk(
  "getCloseShift",
  async (
    { id, banknote = false, employee = false } = {},
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        banknote: banknote.toString(),
        employee: employee.toString(),
      }).toString();
      const res = id
        ? await axios.get(`/close/${id}?${queryParams}`)
        : await axios.get(`/close?${queryParams}`);

      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const CloseShiftSlice = createSlice({
  name: "closeShift",
  initialState: {
    cloData: [],
    cloLoading: false,
    cloError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCloseShift.pending, (state) => {
        state.cloLoading = true;
        state.cloError = null;
      })
      .addCase(getCloseShift.fulfilled, (state, action) => {
        state.cloLoading = false;
        state.cloData = action.payload;
      })
      .addCase(getCloseShift.rejected, (state, action) => {
        state.cloLoading = false;
        state.cloError = action.payload;
      });
  },
});

export default CloseShiftSlice.reducer;
