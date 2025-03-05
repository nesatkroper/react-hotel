import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getPositions = createApiThunk(
  "positions/getPositions",
  "/position"
);

const positionSlice = createGenericSlice("positions", getPositions);
export default positionSlice.reducer;
