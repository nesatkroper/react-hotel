import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import DepartmentAdd from "./components/department-add";
import { DepartmentColumns } from "./components/department-columns";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCacheAsync,
  getDepartments,
} from "@/contexts/reducer/department-slice";

const Department = () => {
  const dispatch = useDispatch();
  const { data: depData, loading: depLoading } = useSelector(
    (state) => state.departments
  );

  useEffect(() => {
    dispatch(getDepartments({ params: { status: "all" } }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCacheAsync());
    dispatch(getDepartments({ params: { status: "all" } }));
  };

  return (
    <Layout>
      <AppDataTable
        data={depData}
        addElement={<DepartmentAdd />}
        columns={DepartmentColumns()}
        loading={depLoading}
        refresh={refresh}
        title='Departments'
        main='departmentName'
      />
    </Layout>
  );
};

export default Department;
