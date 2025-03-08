import { generateColumns } from "@/components/app/table/generate-column";
import { getCustomers } from "@/app/reducer/customer-slice";
import React from "react";
import PropTypes from "prop-types";

const customerFields = [
  { key: "status", label: "" },
  { key: "picture", label: "Picture" },
  { key: "full_name", label: "Name" },
  { key: "gender", label: "Gender" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
];

const customerEditWrapper = ({ item }) => {
  // return <customerEdit items={item} />;
};

export const CustomerColumns = (() => {
  const createEditComponent = (item) => <customerEditWrapper item={item} />;

  return generateColumns(
    customerFields,
    createEditComponent,
    "customer",
    getCustomers,
    { status: "all" }
  );
})();

customerEditWrapper.propTypes = {
  item: PropTypes.object,
};
