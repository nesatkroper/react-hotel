import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import EmployeeAdd from "./components/employee-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { clearCache, getEmployees } from "@/contexts/reducer/employee-slice";
import { EmployeeColumns } from "./components/employee-columns";

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
    dispatch(clearCache());
    dispatch(
      getEmployees({ params: { status: "all", info: true, position: true } })
    );
  };

  return (
    <Layout>
      <AppDataTable
        data={empData}
        loading={empLoading}
        columns={EmployeeColumns()}
        addElement={<EmployeeAdd />}
        title='Employeese'
        add='Add Employee'
        main='employeeName'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Employee;
