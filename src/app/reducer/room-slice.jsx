import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getRooms = createApiThunk("rooms/getRooms", "/room");

const roomSlice = createGenericSlice("rooms", getRooms);
export default roomSlice.reducer;
