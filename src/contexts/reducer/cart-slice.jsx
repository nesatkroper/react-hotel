import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCarts = createApiThunk("carts/getCarts", "/cart");

const cartSlice = createGenericSlice("carts", getCarts);

export const { clearCache } = cartSlice.actions;
export default cartSlice.reducer;
