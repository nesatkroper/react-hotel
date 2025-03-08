import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "@/app/reducer/employee-slice";
import React, { useEffect, useMemo } from "react";
import { EmployeeColumns } from "./components/employee-columns";
import { toNumber } from "@/utils/dec-format";
import Layout from "@/components/app/layout";
import EmployeeAdd from "./components/employee-add";
import AppDataTable from "@/components/app/table/app-data-table";

const Employee = () => {
  const dispatch = useDispatch();
  const { data: empData, loading: empLoading } = useSelector(
    (state) => state?.employees
  );

  useEffect(() => {
    dispatch(getEmployees({ info: true, position: true, department: true }));
  }, [dispatch]);

  console.log(empData);

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
      />
    </Layout>
  );
};

export default Employee;
