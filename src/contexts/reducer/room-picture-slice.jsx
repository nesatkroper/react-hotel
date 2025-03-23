import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getRoomPictures = createApiThunk(
  "roompicture/getRoomPictures",
  "/roompicture"
);

const roomPictureSlice = createGenericSlice("roompicture", getRoomPictures);

export const { clearCache } = roomPictureSlice.actions;
export default roomPictureSlice.reducer;
