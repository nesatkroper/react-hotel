import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOpenShift = createAsyncThunk(
  "getOpenShift",
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
        ? await axios.get(`/open/${id}?${queryParams}`)
        : await axios.get(`/open?${queryParams}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const OpenShiftSlice = createSlice({
  name: "openShift",
  initialState: {
    opeData: [],
    opeLoading: false,
    opeError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOpenShift.pending, (state) => {
        state.opeLoading = true;
        state.opeError = null;
      })
      .addCase(getOpenShift.fulfilled, (state, action) => {
        state.opeLoading = false;
        state.opeData = action.payload;
      })
      .addCase(getOpenShift.rejected, (state, action) => {
        state.opeLoading = false;
        state.opeError = action.payload;
      });
  },
});

export default OpenShiftSlice.reducer;
