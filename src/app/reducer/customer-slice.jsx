import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCustomers = createApiThunk(
  "customers/getCustomers",
  "/customer"
);

const customerSlice = createGenericSlice("customers", getCustomers);
export default customerSlice.reducer;
