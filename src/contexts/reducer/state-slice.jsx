import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getStates = createApiThunk("states/getStates", "/state", {
  cacheEnabled: true,
  cacheExpiration: 24 * 60 * 60 * 1000,
});

const stateSlice = createGenericSlice("states", getStates);

export default stateSlice.reducer;
export const { clearCache, updateItem, addItem, removeItem } =
  stateSlice.actions;
