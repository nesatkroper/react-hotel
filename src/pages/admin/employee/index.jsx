import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import EmployeeAdd from "./components/employee-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeColumns } from "./components/employee-columns";
import {
  clearCacheAsync,
  getEmployees,
} from "@/contexts/reducer/employee-slice";

const Employee = () => {
  const dispatch = useDispatch();
  const { data: empData, loading: empLoading } = useSelector(
    (state) => state?.employees
  );

  useEffect(() => {
    dispatch(
      getEmployees({ params: { status: "all", info: true, position: true } })
    );
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCacheAsync());
    dispatch(
      getEmployees({ params: { status: "all", info: true, position: true } })
    );
  };

  return (
    <Layout>
      <AppDataTable
        data={empData}
        addElement={<EmployeeAdd />}
        columns={EmployeeColumns()}
        loading={empLoading}
        title='Employeese'
        add='Add Employee'
        main='fullName'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Employee;
