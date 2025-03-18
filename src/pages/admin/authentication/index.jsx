import { getAuth } from "@/contexts/reducer/auth-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppDataTable from "@/components/app/table/app-data-table";
import { AuthenticationColumns } from "./components/authentication-columns";
import AuthenticationAdd from "./components/authentication-add";
import Layout from "@/layout/layout";

const Authentication = () => {
  const dispatch = useDispatch();
  const { authData, authLoading } = useSelector((state) => state.auths);

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  console.log(authData);
  return (
    <Layout>
      <AppDataTable
        data={authData}
        loading={authLoading}
        columns={AuthenticationColumns}
        addElement={<AuthenticationAdd />}
        title="Authentication"
        main="email"
      />
    </Layout>
  );
};

export default Authentication;
