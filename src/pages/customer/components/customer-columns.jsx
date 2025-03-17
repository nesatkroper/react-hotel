import { generateColumns } from "@/components/app/table/generate-column";
import { getCustomers } from "@/app/reducer/customer-slice";
import React from "react";
import PropTypes from "prop-types";
import CustomerEdit from "./customer-edit";

const customerFields = [
  { key: "picture", label: "Picture" },
  { key: "full_name", label: "Name" },
  { key: "gender", label: "Gender" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "status", label: "" },
];

const CustomerEditWrapper = ({ item }) => {
  return <CustomerEdit items={item} />;
};

export const CustomerColumns = (() => {
  const createEditComponent = (item) => <CustomerEditWrapper item={item} />;

  return generateColumns(
    customerFields,
    createEditComponent,
    "customer",
    getCustomers
  );
})();

CustomerEditWrapper.propTypes = {
  item: PropTypes.object,
};
