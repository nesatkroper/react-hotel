import React from "react";
import EmployeeEdit from "./employee-edit";
import PropTypes from "prop-types";
import { generateColumns } from "@/components/app/table/generate-column";
import { getEmployees } from "@/contexts/reducer/employee-slice";

const EmployeeEditWrapper = ({ item }) => {
  return <EmployeeEdit items={item} />;
};

export const EmployeeColumns = () => {
  return generateColumns(
    [
      { key: "info.picture", label: "Picture" },
      { key: "full_name", label: "Name" },
      { key: "employee_code", label: "Code" },
      { key: "position.position_name", label: "Position" },
      { key: "gender", label: "Gender" },
      { key: "dob", label: "DOB" },
      { key: "phone", label: "Phone" },
      { key: "salary", label: "Salary" },
      { key: "status", label: "S" },
    ],
    (item) => <EmployeeEditWrapper item={item} />,
    "employee",
    getEmployees
  );
};

EmployeeEditWrapper.propTypes = {
  item: PropTypes.object,
};
