import PositionUpdate from "./position-edit";
import React from "react";
import PropTypes from "prop-types";
import { generateColumns } from "@/components/app/table/generate-column";
import { getPositions } from "@/contexts/reducer/position-slice";
import { useTranslation } from "react-i18next";

const PositionEditWrapper = ({ item }) => {
  return <PositionUpdate items={item} />;
};

export const PositionColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "positionName", label: t("table.pos.name") },
      { key: "positionCode", label: t("table.pos.code") },
      { key: "department.departmentName", label: t("table.dep.name") },
      { key: "status", label: t("table.status") },
    ],
    (item) => <PositionEditWrapper item={item} />,
    "position",
    getPositions
  );
};

PositionEditWrapper.propTypes = {
  item: PropTypes.object,
};
