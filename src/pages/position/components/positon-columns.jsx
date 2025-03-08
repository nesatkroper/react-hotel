import { generateColumns } from "@/components/app/table/generate-column";
import { getPositions } from "@/app/reducer/position-slice";
import PositionUpdate from "./position-update";
import React from "react";
import PropTypes from "prop-types";

const positionFields = [
  { key: "status", label: "S" },
  { key: "position_name", label: "Position Name" },
  { key: "position_code", label: "Position Code" },
  { key: "department.department_name", label: "Department" },
  // { key: "memo", label: "Description" },
];

const PositionUpdateWrapper = ({ item }) => {
  return <PositionUpdate items={item} />;
};

export const PositionColumns = () => {
  const createEditComponent = (item) => <PositionUpdateWrapper item={item} />;

  return generateColumns(
    positionFields,
    createEditComponent,
    "position",
    getPositions
    // { status: "all", department: true }
  );
};

PositionUpdateWrapper.propTypes = {
  item: PropTypes.object,
};
