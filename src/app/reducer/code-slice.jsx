import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsCookie from "js-cookie";

export const getCode = createAsyncThunk("getCode", async () => {
  const shiftInfo = jsCookie.get("shift-info")
    ? JSON.parse(jsCookie.get("shift-info"))
    : {};

  return shiftInfo;
});

const CodeSlice = createSlice({
  name: "shifts",
  initialState: {
    codData: [],
    codLoading: false,
    codError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCode.pending, (state) => {
        state.codLoading = true;
        state.codError = null;
      })
      .addCase(getCode.fulfilled, (state, action) => {
        state.codLoading = false;
        state.codData = action.payload;
      })
      .addCase(getCode.rejected, (state, action) => {
        state.codLoading = false;
        state.codError = action.payload;
      });
  },
});

export default CodeSlice.reducer;
