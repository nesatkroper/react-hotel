import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { CustomerColumns } from "./components/customer-columns";
import React, { useEffect } from "react";
import { clearCache, getCustomers } from "@/app/reducer/customer-slice";
import CustomerAdd from "./components/customer-add";

const Customer = () => {
  const dispatch = useDispatch();
  const { data: cusData, loading: cusLoading } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const refresh = () => {
    dispatch(getCustomers());
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
