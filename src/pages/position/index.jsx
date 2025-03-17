import React, { useEffect, useMemo } from "react";
import Layout from "@/components/app/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import PositionAdd from "./components/position-add";
import { clearCache, getPositions } from "@/app/reducer/position-slice";
import { PositionColumns } from "./components/positon-columns";
import { toNumber } from "@/utils/dec-format";
import { useDispatch, useSelector } from "react-redux";

const Position = () => {
  const dispatch = useDispatch();
  const { data: posData, loading: posLoading } = useSelector(
    (state) => state.positions
  );

  useEffect(() => {
    dispatch(getPositions({ status: "all", department: true }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getPositions({ status: "all", department: true }));
  };

  const lastCode = useMemo(() => {
    if (!posData || !posData.length) return 0;
    const code = toNumber(posData[0]?.position_code, "-");
    return Number.isNaN(code) || code == null ? 0 : code;
  }, [posData]);

  return (
    <Layout>
      <AppDataTable
        data={posData}
        columns={PositionColumns}
        loading={posLoading}
        addElement={<PositionAdd key={lastCode} lastCode={lastCode} />}
        title="Positions"
        main="position_name"
        refresh={refresh}
      />
    </Layout>
  );
};

export default Position;
