import React from "react";
import PropTypes from "prop-types";
import AuthenticationEdit from "./authentication-edit";
import { generateColumns } from "@/components/app/table/generate-column";
import { useTranslation } from "react-i18next";
import { getAuth } from "@/contexts/reducer/auth-slice";

const AuthenticationEditWrapper = ({ item }) => {
  return <AuthenticationEdit items={item} />;
};

export const AuthenticationColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "employee.fullname", label: t("table.pos.name") },
      { key: "email", label: t("table.pos.code") },
      { key: "password", label: t("table.dep.name") },
      { key: "status", label: t("table.status") },
    ],
    (item) => <AuthenticationEditWrapper item={item} />,
    "auth",
    getAuth
  );
};

AuthenticationEditWrapper.propTypes = {
  item: PropTypes.object,
};
