import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getEmployees = createApiThunk(
  "employees/getEmployees",
  "/employee"
);

const employeeSlice = createGenericSlice("employees", getEmployees);

export const { clearCache } = employeeSlice.actions;
export default employeeSlice.reducer;
