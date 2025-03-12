import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getDepartments = createApiThunk(
  "departments/getDepartments",
  "/department"
);

const departmentSlice = createGenericSlice("departments", getDepartments);

export const { clearCache } = departmentSlice.actions;
export default departmentSlice.reducer;
