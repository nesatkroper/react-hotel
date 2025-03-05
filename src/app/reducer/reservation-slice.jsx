import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getReservations = createApiThunk(
  "reservations/getReservations",
  "/reservation"
);

const reservationSlice = createGenericSlice("reservations", getReservations);
export default reservationSlice.reducer;
