import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getShifts = createApiThunk("shifts/getShifts", "/shift");

const shiftSlice = createGenericSlice("shifts", getShifts);
export default shiftSlice.reducer;
