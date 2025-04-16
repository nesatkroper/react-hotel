import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getEmployees = createApiThunk(
  "employees/getEmployees",
  "/employee",
  {
    cacheEnabled: true,
    cacheExpiration: 24 * 60 * 60 * 1000,
  }
);

const employeeSlice = createGenericSlice("employees", getEmployees);

export const { clearCacheAsync } = employeeSlice;
export const { clearCache, updateItem, addItem, removeItem } =
  employeeSlice.actions;
export default employeeSlice.reducer;
