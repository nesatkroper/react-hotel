import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getCities = createApiThunk("cities/getCities", "/city");

const citieSlice = createGenericSlice("cities", getCities);

export const { clearCache } = citieSlice.actions;
export default citieSlice.reducer;
