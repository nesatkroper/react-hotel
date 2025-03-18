import React, { useEffect, useMemo } from "react";
import Layout from "@/layout/layout";
import EmployeeAdd from "./components/employee-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { clearCache, getEmployees } from "@/contexts/reducer/employee-slice";
import { EmployeeColumns } from "./components/employee-columns";
import { toNumber } from "@/utils/dec-format";

const Employee = () => {
  const dispatch = useDispatch();
  const { data: empData, loading: empLoading } = useSelector(
    (state) => state?.employees
  );

  useEffect(() => {
    dispatch(getEmployees({ status: "all", info: true, position: true }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getEmployees({ status: "all", info: true, position: true }));
  };

  const lastCode = useMemo(() => {
    const code = toNumber(empData[0]?.employee_code, "-");
    return Number.isNaN(code) || code == null ? 0 : code;
  }, [empData]);

  return (
    <Layout>
      <AppDataTable
        data={empData}
        loading={empLoading}
        columns={EmployeeColumns}
        addElement={
          <EmployeeAdd key={lastCode} name="Name" lastCode={lastCode} />
        }
        title="Employeese"
        add="Add Employee"
        main="employee_name"
        refresh={refresh}
      />
    </Layout>
  );
};

export default Employee;
