import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getRoomtypes = createApiThunk(
  "roomtypes/getRoomtypes",
  "/roomtype"
);

const roomtypeSlice = createGenericSlice("roomtypes", getRoomtypes);

export const { clearCache } = roomtypeSlice.actions;
export default roomtypeSlice.reducer;
