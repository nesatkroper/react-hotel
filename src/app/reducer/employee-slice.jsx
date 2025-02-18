import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEmployees = createAsyncThunk(
  "getEmployees",
  async (
    {
      id,
      order = "desc",
      position = false,
      department = false,
      reservedetails = false,
      sales = false,
      opens = false,
      closes = false,
      info = false,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        order: order,
        position: position.toString(),
        department: department.toString(),
        reservedetails: reservedetails.toString(),
        sales: sales.toString(),
        opens: opens.toString(),
        closes: closes.toString(),
        info: info.toString(),
      }).toString();

      const res = id
        ? await axios.get(`/employee/${id}?${queryParams}`)
        : await axios.get(`/employee?${queryParams}`);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    empData: [],
    empLoading: false,
    empError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.empLoading = true;
        state.empError = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.empLoading = false;
        state.empData = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.empLoading = false;
        state.empError = action.payload;
      });
  },
});

export default employeeSlice.reducer;
