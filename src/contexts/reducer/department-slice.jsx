import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getDepartments = createApiThunk(
  "departments/getDepartments",
  "/department",
  {
    cacheEnabled: true,
    cacheExpiration: 24 * 60 * 60 * 1000,
  }
);

const departmentSlice = createGenericSlice("departments", getDepartments, {
  meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
});

export default departmentSlice.reducer;
export const { clearCacheAsync } = departmentSlice;
export const { clearCache, updateItem, addItem, removeItem } =
  departmentSlice.actions;
