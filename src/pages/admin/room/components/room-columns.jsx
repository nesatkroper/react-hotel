import React from "react";
import RoomEdit from "./room-edit";
import { generateColumns } from "@/components/app/table/generate-column";
import PropTypes from "prop-types";
import { getRooms } from "@/contexts/reducer";

const roomColumns = [
  { key: "picture", label: "Picture" },
  { key: "room_name", label: "Room Number" },
  { key: "roomtype.type_name", label: "Room Type" },
  { key: "price", label: "Price" },
  { key: "discount_rate", label: "Discount Rate" },
  { key: "size", label: "Size" },
  { key: "capacity", label: "Capacity" },
  { key: "is_ac", label: "AC" },
  { key: "status", label: "Status" },
];

const RoomEditWrapper = ({ item }) => {
  return <RoomEdit items={item} />;
};

export const RoomColumns = (() => {
  const createEditComponent = (item) => <RoomEditWrapper item={item} />;

  return generateColumns(roomColumns, createEditComponent, "room", getRooms);
})();

RoomEditWrapper.propTypes = {
  item: PropTypes.object,
};
