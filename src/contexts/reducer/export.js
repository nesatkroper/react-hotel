import userReduce from "./user-slice";
import authReduce from "./auth-slice";
import roomReduce from "./room-slice";
import roomTypeReduce from "./room-type-slice";
import departmentReduce from "./department-slice";
import positionReduce from "./position-slice";
import customerReduce from "./customer-slice";
import employeeReduce from "./employee-slice";
import rdetailReduce from "./room-detail-slice";
import reservationReduce from "./reservation-slice";
import rpictureReduce from "./room-picture-slice";
import pcategoryReduce from "./product-category-slice";
import productReduce from "./product-slice";
import counterReduce from "./cart-slice";
import searchCateReduce from "./search-category-slice";
import banknoteReduce from "./bank-note-slice";
import shiftReduce from "./shift-slice";
import cartReduce from "./cart-slice";
import codeReduce from "./code-slice";
import stateReduce from "./state-slice";
import cityReduce from "./city-slice";
import groupMessageReduce from "./group-message-slice";

export default {
  user: userReduce,
  auths: authReduce,
  rooms: roomReduce,
  roomtypes: roomTypeReduce,
  departments: departmentReduce,
  positions: positionReduce,
  customers: customerReduce,
  employees: employeeReduce,
  reserveDetails: rdetailReduce,
  roompicture: rpictureReduce,
  reservations: reservationReduce,
  pcategories: pcategoryReduce,
  products: productReduce,
  cart: cartReduce,
  searchCates: searchCateReduce,
  banknotes: banknoteReduce,
  shifts: shiftReduce,
  code: codeReduce,
  states: stateReduce,
  cities: cityReduce,
  counters: counterReduce,
  groupmessage: groupMessageReduce,
};
