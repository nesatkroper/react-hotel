import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getShift = createAsyncThunk(
  "getShift",
  async (
    { id, banknotes = true, employee = true } = {},
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        banknotes: banknotes.toString(),
        employee: employee.toString(),
      }).toString();
      const res = id
        ? await axios.get(`/shift/${id}?${queryParams}`)
        : await axios.get(`/shift?${queryParams}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const ShiftSlice = createSlice({
  name: "shifts",
  initialState: {
    shiData: [],
    shiLoading: false,
    shiError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShift.pending, (state) => {
        state.shiLoading = true;
        state.shiError = null;
      })
      .addCase(getShift.fulfilled, (state, action) => {
        state.shiLoading = false;
        state.shiData = action.payload;
      })
      .addCase(getShift.rejected, (state, action) => {
        state.shiLoading = false;
        state.shiError = action.payload;
      });
  },
});

export default ShiftSlice.reducer;
