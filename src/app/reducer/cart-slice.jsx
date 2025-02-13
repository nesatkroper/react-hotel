import axiosAuth from "@/providers/axios-auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk(
  "getCart",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = id
        ? await axiosAuth.get(`/cart/${id}`)
        : await axiosAuth.get(`/cart`);

      const sorted = res.data?.sort((a, b) => a.cart_id - b.cart_id);
      console.log(sorted);
      return sorted;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: null,
    cartLoading: false,
    cartError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartData = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload;
      });
  },
});

export default cartSlice.reducer;
