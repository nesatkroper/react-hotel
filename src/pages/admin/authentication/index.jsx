import React, { useEffect } from "react";
import AppDataTable from "@/components/app/table/app-data-table";
import AuthenticationAdd from "./components/authentication-add";
import Layout from "@/layout/layout";
import { getAuth } from "@/contexts/reducer/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticationColumns } from "./components/authentication-columns";

const Authentication = () => {
  const dispatch = useDispatch();
  const { authData, authLoading } = useSelector((state) => state.auths);

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  console.log(authData);

  console.log(authData);
  return (
    <Layout>
      <AppDataTable
        data={authData}
        loading={authLoading}
        columns={AuthenticationColumns()}
        addElement={<AuthenticationAdd />}
        title='Authentication'
        main='email'
      />
    </Layout>
  );
};

export default Authentication;
