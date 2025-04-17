import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCustomers = createApiThunk(
  "customers/getCustomers",
  "/customer",
  {
    cacheEnabled: true,
    cacheExpiration: 24 * 60 * 60 * 1000,
  }
);

const customerSlice = createGenericSlice("customers", getCustomers);

export default customerSlice.reducer;
export const { clearCacheAsync } = customerSlice;
export const { clearCache, updateItem, addItem, removeItem } =
  customerSlice.actions;
