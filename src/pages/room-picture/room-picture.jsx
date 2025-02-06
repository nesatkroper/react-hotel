import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRpicture } from "@/app/reducer/room-picture-slice";
import Layout from "@/components/app/layout";
import RoomPictureAdd from "./components/room-picture-add";
import AppDataTable from "@/components/app/table/app-data-table";
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
