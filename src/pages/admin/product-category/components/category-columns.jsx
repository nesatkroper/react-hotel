import React from "react";
import PropTypes from "prop-types";
import CategoryUpdate from "./category-edit";
import { generateColumns } from "@/components/app/table/generate-column";
import { useTranslation } from "react-i18next";
import { getCategorys } from "@/contexts/reducer";

const CategoryEdit = ({ item }) => {
  return <CategoryUpdate items={item} />;
};

export const CategoryColumns = () => {
  const [t] = useTranslation("admin");

  return generateColumns(
    [
      { key: "picture", label: t("table.pic") },
      { key: "categoryName", label: t("table.cate.name") },
      { key: "categoryCode", label: t("table.cate.code") },
      { key: "memo", label: t("table.desc") },
      { key: "status", label: t("table.status") },
    ],
    (item) => <CategoryEdit item={item} />,
    "department",
    getCategorys
  );
};

CategoryEdit.propTypes = {
  item: PropTypes.object,
};
