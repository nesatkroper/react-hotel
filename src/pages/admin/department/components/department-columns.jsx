import React from "react";
import DepartmentUpdate from "./department-edit";
import PropTypes from "prop-types";
import { generateColumns } from "@/components/app/table/generate-column";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { useTranslation } from "react-i18next";

const DepartmentEditWrapper = ({ item }) => {
  return <DepartmentUpdate items={item} />;
};

export const DepartmentColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "departmentName", label: t("table.dep.name") },
      { key: "departmentCode", label: t("table.dep.code") },
      { key: "memo", label: t("table.desc") },
      { key: "status", label: t("table.status") },
    ],
    (item) => <DepartmentEditWrapper item={item} />,
    "department",
    getDepartments
  );
};

DepartmentEditWrapper.propTypes = {
  item: PropTypes.object,
};
