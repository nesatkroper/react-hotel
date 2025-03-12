import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCategorys = createApiThunk(
  "categorys/getCategorys",
  "/category"
);

const categorySlice = createGenericSlice("categorys", getCategorys);

export const { clearCache } = categorySlice.actions;
export default categorySlice.reducer;
