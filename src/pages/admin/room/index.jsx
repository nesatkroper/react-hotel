import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import RoomAdd from "./components/room-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { clearCache, getRooms } from "@/contexts/reducer/room-slice";
import { RoomColumns } from "./components/room-columns";

const Room = () => {
  const dispatch = useDispatch();
  const { data: rooData, loading: rooLoading } = useSelector(
    (state) => state.rooms
  );

  useEffect(() => {
    dispatch(
      getRooms({ status: "all", roomtype: true, pictures: true, order: "asc" })
    );
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCache());
    getRooms({
      status: "all",
      roomtype: true,
      pictures: true,
      order: "asc",
    });
  };

  return (
    <Layout>
      <AppDataTable
        data={rooData}
        addElement={<RoomAdd />}
        columns={RoomColumns()}
        loading={rooLoading}
        refresh={refresh}
        title='Rooms'
        main='room_name'
      />
    </Layout>
  );
};

export default Room;
