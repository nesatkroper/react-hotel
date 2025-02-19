import axiosAuth from "@/providers/axios-auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk(
  "getProduct",
  async ({ id, category, stocks, saledetails } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        category: category.toString(),
        stocks: stocks.toString(),
        saledetails: saledetails.toString(),
      }).toString();

      const res = id
        ? await axiosAuth.get(`/product/${id}?${queryParams}`)
        : await axiosAuth.get(`/product?${queryParams}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    proData: [],
    proLoading: false,
    proError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.proLoading = true;
        state.proError = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.proLoading = false;
        state.proData = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.proLoading = false;
        state.proError = action.payload;
      });
  },
});

export default productSlice.reducer;
