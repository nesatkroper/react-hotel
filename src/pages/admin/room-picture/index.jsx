import React, { useEffect } from "react";
import RoomPictureAdd from "./components/room-picture-add";
import AppDataTable from "@/components/app/table/app-data-table";
import Layout from "@/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCache,
  getRoomPictures,
} from "@/contexts/reducer/room-picture-slice";
import { PictureColumns } from "./components/room-picture-column";

const RoomPicture = () => {
  const dispatch = useDispatch();
  const { data: rpiData, loading: rpiLoading } = useSelector(
    (state) => state.roompicture
  );

  useEffect(() => {
    dispatch(getRoomPictures({ room: true }));
  }, [dispatch]);

  const refresh = () => {
    dispatch(clearCache());
    dispatch(getRoomPictures({ room: true }));
  };

  return (
    <Layout>
      <AppDataTable
        data={rpiData}
        columns={PictureColumns()}
        loading={rpiLoading}
        addElement={<RoomPictureAdd />}
        main='picture'
        title='Room Pictures'
        refresh={refresh}
      />
    </Layout>
  );
};

export default RoomPicture;
