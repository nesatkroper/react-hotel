import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getProducts = createApiThunk("products/getProducts", "/product");

const productSlice = createGenericSlice("products", getProducts);

export const { clearCache } = productSlice.actions;
export default productSlice.reducer;
