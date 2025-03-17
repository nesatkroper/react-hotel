import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducer/export";

export default configureStore({
  reducer: reducers,
});
