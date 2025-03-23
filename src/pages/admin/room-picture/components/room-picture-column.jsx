import React from "react";
import PictureEdit from "./room-picture-update";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { generateColumns } from "@/components/app/table/generate-column";
import { getRoomPictures } from "@/contexts/reducer/room-picture-slice";

const PictureEditWrapper = ({ item }) => {
  return <PictureEdit items={item} />;
};

export const PictureColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "picture", label: t("table.pic") },
      { key: "room.room_name", label: t("table.room.name") },
      { key: "status", label: t("table.status") },
    ],
    (item) => <PictureEditWrapper item={item} />,
    "roompicture",
    getRoomPictures
  );
};

PictureEditWrapper.propTypes = {
  item: PropTypes.object,
};
