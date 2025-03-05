import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getBanknotes = createApiThunk(
  "banknotes/getBanknotes",
  "/banknote"
);

const banknoteSlice = createGenericSlice("banknotes", getBanknotes);
export default banknoteSlice.reducer;
