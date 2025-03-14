import { generateColumns } from "@/components/app/table/generate-column";
import { clearCache, getEmployees } from "@/app/reducer/employee-slice";
import React from "react";
import EmployeeEdit from "./employee-edit";
import PropTypes from "prop-types";

const employeeFields = [
  { key: "info.picture", label: "Picture" },
  { key: "full_name", label: "Name" },
  { key: "employee_code", label: "Code" },
  { key: "position.position_name", label: "Position" },
  { key: "gender", label: "Gender" },
  { key: "dob", label: "DOB" },
  { key: "phone", label: "Phone" },
  { key: "salary", label: "Salary" },
  { key: "status", label: "S" },
];

const EmployeeEditWrapper = ({ item }) => {
  return <EmployeeEdit items={item} />;
};

export const EmployeeColumns = (() => {
  const createEditComponent = (item) => <EmployeeEditWrapper item={item} />;

  return generateColumns(
    employeeFields,
    createEditComponent,
    "employee",
    clearCache,
    getEmployees
  );
})();

EmployeeEditWrapper.propTypes = {
  item: PropTypes.object,
};
