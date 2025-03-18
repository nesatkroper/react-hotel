import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCustomers = createApiThunk(
  "customers/getCustomers",
  "/customer"
);

const customerSlice = createGenericSlice("customers", getCustomers);

export const { clearCache } = customerSlice.actions;
export default customerSlice.reducer;
