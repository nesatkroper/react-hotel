import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getDepartments = createApiThunk(
  "departments/getDepartments",
  "/department"
);

const departmentSlice = createGenericSlice("departments", getDepartments);
export default departmentSlice.reducer;
