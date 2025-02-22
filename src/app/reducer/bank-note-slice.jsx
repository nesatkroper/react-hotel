import axios from "@/providers/axios-instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBanknote = createAsyncThunk(
  "getBanknote",
  async ({ id, open = true, close = true } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        close: close.toString(),
        open: open.toString(),
      }).toString();

      const res = id
        ? await axios.get(`/banknote/${id}?${queryParams}`)
        : await axios.get(`/banknote?${queryParams}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const BanknoteSlice = createSlice({
  name: "banknote",
  initialState: {
    banData: [],
    banLoading: false,
    banError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanknote.pending, (state) => {
        state.banLoading = true;
        state.banError = null;
      })
      .addCase(getBanknote.fulfilled, (state, action) => {
        state.banLoading = false;
        state.banData = action.payload;
      })
      .addCase(getBanknote.rejected, (state, action) => {
        state.banLoading = false;
        state.banError = action.payload;
      });
  },
});

export default BanknoteSlice.reducer;
