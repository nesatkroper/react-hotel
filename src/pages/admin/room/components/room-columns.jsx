import React from "react";
import RoomEdit from "./room-edit";
import PropTypes from "prop-types";
import { generateColumns } from "@/components/app/table/generate-column";
import { getRooms } from "@/contexts/reducer";
import { useTranslation } from "react-i18next";

const RoomEditWrapper = ({ item }) => {
  return <RoomEdit items={item} />;
};

export const RoomColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "picture", label: t("table.pic") },
      { key: "room_name", label: t("table.room.name") },
      { key: "roomtype.type_name", label: t("table.room.type") },
      { key: "price", label: t("table.room.price") },
      { key: "discount_rate", label: t("table.room.dis") },
      { key: "size", label: t("table.room.size") },
      { key: "capacity", label: t("table.room.capacity") },
      { key: "is_ac", label: t("table.room.ac") },
      { key: "status", label: t("table.status") },
    ],
    (item) => <RoomEditWrapper item={item} />,
    "room",
    getRooms
  );
};

RoomEditWrapper.propTypes = {
  item: PropTypes.object,
};
