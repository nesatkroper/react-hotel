import React, { useEffect } from "react";
import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import CustomerAdd from "./components/customer-add";
import { useDispatch, useSelector } from "react-redux";
import { CustomerColumns } from "./components/customer-columns";
import { clearCache, getCustomers } from "@/app/reducer/customer-slice";

const Customer = () => {
  const dispatch = useDispatch();
  const { data: cusData, loading: cusLoading } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    dispatch(getCustomers({ status: "all" }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(getCustomers({ status: "all" }));
    dispatch(clearCache());
  };

  return (
    <Layout>
      <AppDataTable
        data={cusData}
        loading={cusLoading}
        columns={CustomerColumns}
        addElement={<CustomerAdd />}
        title="Customers"
        main="customer_name"
        refresh={refresh}
      />
    </Layout>
  );
};

export default Customer;
