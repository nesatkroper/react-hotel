import { generateColumns } from "@/components/app/table/generate-column";
import { getDepartments } from "@/app/reducer/department-slice";
import React from "react";
import DepartmentUpdate from "./department-update";
import PropTypes from "prop-types";

const departmentFields = [
  { key: "department_name", label: "Department Name" },
  { key: "department_code", label: "Department Code" },
  { key: "memo", label: "Description" },
  { key: "status", label: "Status" },
];

const DepartmentUpdateWrapper = ({ item }) => {
  return <DepartmentUpdate items={item} />;
};

export const DepartmentColumns = (() => {
  const createEditComponent = (item) => <DepartmentUpdateWrapper item={item} />;

  return generateColumns(
    departmentFields,
    createEditComponent,
    "department",
    getDepartments,
    { status: "all" }
  );
})();

DepartmentUpdateWrapper.propTypes = {
  item: PropTypes.object,
};
