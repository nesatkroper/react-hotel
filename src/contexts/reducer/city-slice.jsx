import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCities = createApiThunk("cities/getCities", "/city", {
  cacheEnabled: true,
  cacheExpiration: 24 * 60 * 60 * 1000,
});

const citieSlice = createGenericSlice("cities", getCities);

export default citieSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem } =
  citieSlice.actions;
