import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

export const getReservations = createApiThunk(
  "reservations/getReservations",
  "/reservation"
);

const reservationSlice = createGenericSlice("reservations", getReservations);

export const { clearCache } = reservationSlice.actions;
export default reservationSlice.reducer;
