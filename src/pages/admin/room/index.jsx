import React, { useEffect } from "react";
import Layout from "@/layout/layout";
import RoomAdd from "./components/room-add";
import AppDataTable from "@/components/app/table/app-data-table";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/contexts/reducer/room-slice";
import { RoomColumns } from "./components/room-columns";

const Room = () => {
  const dispatch = useDispatch();
  const { rooData, rooLoading } = useSelector((state) => state?.rooms);

  useEffect(() => {
    dispatch(getRooms({ roomtype: true, pictures: true }));
  }, [dispatch]);

  console.log(rooData);

  return (
    <Layout>
      <AppDataTable
        data={rooData}
        columns={RoomColumns}
        title="Rooms"
        main="room_name"
        loading={rooLoading}
        add="Add Room"
        addElement={<RoomAdd />}
      />
    </Layout>
  );
};

export default Room;
