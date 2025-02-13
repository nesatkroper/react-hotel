import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  role: "admin",
  auth_id: 0,
};

const authSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.role = action.payload.role;
      state.auth_id = action.payload.auth_id;
      Cookies.set("role", action.payload.role, { expires: 0.5, path: "/" });
      Cookies.set("auth_id", action.payload.auth_id, {
        expires: 0.5,
        path: "/",
      });
    },

    clearAuthData: (state) => {
      state.role = null;
      state.auth_id = null;

      Cookies.remove("token");
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
