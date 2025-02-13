import { configureStore } from "@reduxjs/toolkit";

import roleReduce from "@/app/reducer/role-slice";
import userReduce from "@/app/reducer/user-slice";
import authReduce from "@/app/reducer/auth-slice";
import roomReduce from "@/app/reducer/room-slice";
import departmentReduce from "@/app/reducer/department-slice";
import positionReduce from "@/app/reducer/position-slice";
import customerReduce from "@/app/reducer/customer-slice";
import employeeReduce from "@/app/reducer/employee-slice";
import rdetailReduce from "@/app/reducer/room-detail-slice";
import reservationReduce from "@/app/reducer/reservationSlice";
import rpictureReduce from "@/app/reducer/room-picture-slice";
import pcategoryReduce from "@/app/reducer/product-category-slice";
import productReduce from "@/app/reducer/product-slice";
import counterReduce from "./reducer/cart-slice";
import searchCateReduce from "@/app/reducer/search-category-slice";
import banknoteRduce from "@/app/reducer/bank-note-slice";
import openshiftReduce from "@/app/reducer/open-shift-slice";
import closeshiftReduce from "@/app/reducer/close-shift-slice";
import cartReduce from "@/app/reducer/cart-slice";

export default configureStore({
  reducer: {
    role: roleReduce,
    user: userReduce,
    auths: authReduce,
    rooms: roomReduce,
    departments: departmentReduce,
    positions: positionReduce,
    customers: customerReduce,
    employees: employeeReduce,
    reserveDetails: rdetailReduce,
    roomPictures: rpictureReduce,
    reservations: reservationReduce,
    pcategories: pcategoryReduce,
    products: productReduce,
    cart: cartReduce,
    searchCates: searchCateReduce,
    banknotes: banknoteRduce,
    openshifts: openshiftReduce,
    closeshifts: closeshiftReduce,
    counters: counterReduce,
  },
});
