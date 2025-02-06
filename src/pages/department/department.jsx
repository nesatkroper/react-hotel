import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getDepartments } from "@/app/reducer/department-slice";
import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import DepartmentAdd from "./components/department-add";
import { DepartmentColumns } from "./components/department-columns";
import { toNumber } from "@/utils/dec-format";

const Department = () => {
  const dispatch = useDispatch();
  const { depData, depLoading } = useSelector((state) => state?.departments);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const lastCode = useMemo(() => {
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
        title="Departments"
        main="department_name"
      />
    </Layout>
  );
};

export default Department;
