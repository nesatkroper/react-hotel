import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDepartments = createAsyncThunk(
  "getDepartments",
  async (
    { id, order = "desc", positions, employees } = {},
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        order: order,
        positions: positions.tiString(),
        employees: employees.toString(),
      }).toString();

      const res = id
        ? await axios.get(`/department/${id}?${queryParams}`)
        : await axios.get(`/department?${queryParams}`);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    depData: [],
    depLoading: false,
    depError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.depLoading = true;
        state.depError = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.depLoading = false;
        state.depData = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.depLoading = false;
        state.depError = action.payload;
      });
  },
});

export default departmentSlice.reducer;
