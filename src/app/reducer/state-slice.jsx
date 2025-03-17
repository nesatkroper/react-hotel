import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getStates = createApiThunk("states/getStates", "/state");

const stateSlice = createGenericSlice("states", getStates);

export const { clearCache } = stateSlice.actions;
export default stateSlice.reducer;
