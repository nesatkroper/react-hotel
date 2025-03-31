import React, { useEffect } from "react";
import AppDataTable from "@/components/app/table/app-data-table";
import Layout from "@/layout/layout";
import CustomerAdd from "./components/customer-add";
import { useDispatch, useSelector } from "react-redux";
import { CustomerColumns } from "./components/customer-columns";
import { clearCache, getCustomers } from "@/contexts/reducer/customer-slice";

const Customer = () => {
  const dispatch = useDispatch();
  const { data: cusData, loading: cusLoading } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    dispatch(getCustomers({ params: { status: "all" } }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(getCustomers({ params: { status: "all" } }));
    dispatch(clearCache());
  };

  return (
    <Layout>
      <AppDataTable
        data={cusData}
        loading={cusLoading}
        columns={CustomerColumns()}
        addElement={<CustomerAdd />}
        title='Customers'
        main='fullName'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Customer;
