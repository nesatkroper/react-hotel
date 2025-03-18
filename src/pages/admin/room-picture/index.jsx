import React, { useEffect } from "react";
import RoomPictureAdd from "./components/room-picture-add";
import AppDataTable from "@/components/app/table/app-data-table";
import Layout from "@/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { getRpicture } from "@/contexts/reducer/room-picture-slice";
import { RoomPictureColumns } from "./components/room-picture-column";

const RoomPicture = () => {
  const dispatch = useDispatch();
  const { rpiData, rpiLoading } = useSelector((state) => state?.roomPictures);

  useEffect(() => {
    dispatch(getRpicture());
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={rpiData}
        columns={RoomPictureColumns}
        loading={rpiLoading}
        addElement={<RoomPictureAdd />}
        main="room_id"
        title="Room Pictures"
      />
    </Layout>
  );
};

export default RoomPicture;
