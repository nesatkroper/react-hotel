import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getBanknotes = createApiThunk(
  "banknotes/getBanknotes",
  "/banknote"
);

const banknoteSlice = createGenericSlice("banknotes", getBanknotes);

export const { clearCache } = banknoteSlice.actions;
export default banknoteSlice.reducer;
