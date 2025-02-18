import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPositions = createAsyncThunk(
  "getPositions",
  async (
    { id, order = "desc", department = false, employees = false } = {},
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        order: order,
        department: department.toString(),
        employees: employees.toString(),
      }).toString();
      const res = id
        ? await axios.get(`/position/${id}?${queryParams}`)
        : await axios.get(`/position?${queryParams}`);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const positionSlice = createSlice({
  name: "positions",
  initialState: {
    posData: [],
    posLoading: false,
    posError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPositions.pending, (state) => {
        state.posLoading = true;
        state.posError = null;
      })
      .addCase(getPositions.fulfilled, (state, action) => {
        state.posLoading = false;
        state.posData = action.payload;
      })
      .addCase(getPositions.rejected, (state, action) => {
        state.posLoading = false;
        state.posError = action.payload;
      });
  },
});

export default positionSlice.reducer;
