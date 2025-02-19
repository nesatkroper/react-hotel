import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPcategory = createAsyncThunk(
  "getPcategory",
  async ({ id, order = "desc", products } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        order: order,
        products: products.toString(),
      }).toString();
      const res = id
        ? await axios.get(`/category/${id}?${queryParams}`)
        : await axios.get(`/category?${queryParams}`);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const pcategorySlice = createSlice({
  name: "pcategory",
  initialState: {
    pcaData: [],
    pcaLoading: false,
    pcaError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPcategory.pending, (state) => {
        state.pcaLoading = true;
        state.pcaError = null;
      })
      .addCase(getPcategory.fulfilled, (state, action) => {
        state.pcaLoading = false;
        state.pcaData = action.payload;
      })
      .addCase(getPcategory.rejected, (state, action) => {
        state.pcaLoading = false;
        state.pcaError = action.payload;
      });
  },
});

export default pcategorySlice.reducer;
