import React, { useEffect, useMemo } from "react";
import Layout from "@/layout/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import DepartmentAdd from "./components/department-add";
import { DepartmentColumns } from "./components/department-columns";
import { toNumber } from "@/utils/dec-format";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCache,
  getDepartments,
} from "@/contexts/reducer/department-slice";

const Department = () => {
  const dispatch = useDispatch();
  const { data: depData, loading: depLoading } = useSelector(
    (state) => state.departments
  );

  useEffect(() => {
    dispatch(getDepartments({ status: "all" }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getDepartments({ status: "all" }));
  };

  const lastCode = useMemo(() => {
    if (!depData || !depData.length) return 0;
    const code = toNumber(depData[0]?.department_code, "-");
    return Number.isNaN(code) || code == null ? 0 : code;
  }, [depData]);

  return (
    <Layout>
      <AppDataTable
        data={depData}
        columns={DepartmentColumns}
        loading={depLoading}
        addElement={<DepartmentAdd key={lastCode} lastCode={lastCode} />}
        title='Departments'
        main='department_name'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Department;
