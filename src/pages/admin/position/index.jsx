import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import AppDataTable from "@/components/app/table/app-data-table";
import PositionAdd from "./components/position-add";
import {
  clearCacheAsync,
  getPositions,
} from "@/contexts/reducer/position-slice";
import { PositionColumns } from "./components/positon-columns";
import { useDispatch, useSelector } from "react-redux";

const Position = () => {
  const dispatch = useDispatch();
  const { data: posData, loading: posLoading } = useSelector(
    (state) => state.positions
  );

  useEffect(() => {
    dispatch(
      getPositions({
        params: { status: "all", department: true },
      })
    );
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCacheAsync());
    dispatch(getPositions({ params: { status: "all", department: true } }));
  };

  return (
    <Layout>
      <AppDataTable
        data={posData}
        columns={PositionColumns()}
        loading={posLoading}
        addElement={<PositionAdd />}
        title='Positions'
        main='positionName'
        refresh={refresh}
      />
    </Layout>
  );
};

export default Position;
