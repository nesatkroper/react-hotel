import Cookies from "js-cookie";
import axiosAuth from "@/lib/axios-auth";
import { decrypt, encrypt } from "../utils/cryption";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("getUser", async () => {
  try {
    const authInfo = Cookies.get("auth-info");
    if (authInfo) {
      const decryptedData = decrypt(authInfo, "auth");
      if (decryptedData) {
        return decryptedData;
      }
      Cookies.remove("auth-info");
    }

    const response = await axiosAuth.get("/auth/me");
    const userData = response.data;

    const encryptedData = encrypt(userData, "auth");
    if (encryptedData) {
      Cookies.set("auth-info", encryptedData, {
        expires: 0.5,
      });
    }

    return userData;
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw err;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    usrData: null,
    usrLoading: false,
    usrError: null,
  },
  reducers: {
    clearUser: (state) => {
      state.usrData = null;
      state.usrError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.usrLoading = true;
        state.usrError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.usrLoading = false;
        state.usrData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.usrLoading = false;
        state.usrError = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
