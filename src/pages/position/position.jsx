import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getPositions } from "@/app/reducer/position-slice";
import { PositionColumns } from "./components/positon-columns";
import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import PositionAdd from "./components/position-add";
import { toNumber } from "@/utils/dec-format";

const Position = () => {
  const dispatch = useDispatch();
  const { posData, posLoading } = useSelector((state) => state?.positions);

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  const lastCode = useMemo(() => {
    const code = toNumber(posData[0]?.position_code, "-");
    return Number.isNaN(code) || code == null ? 0 : code;
  }, [posData]);

  return (
    <Layout>
      <AppDataTable
        data={posData}
        loading={posLoading}
        columns={PositionColumns}
        addElement={<PositionAdd key={lastCode} lastCode={lastCode} />}
        main="position_name"
        title="Positions"
      />
    </Layout>
  );
};

export default Position;
