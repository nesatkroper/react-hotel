import Layout from "@/layout/layout";
import React, { useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import FrontDeskHeader from "./components/frontdesk-header";
import FrontDeskGrid from "./components/frontdesk-grid";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/contexts/reducer";

const Resevation = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: rooData } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(
      getRooms({ status: "all", roomtype: true, pictures: true, order: "asc" })
    );
  }, [dispatch]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <Layout>
      <FrontDeskGrid
        currentDate={currentDate}
        roomData={rooData}
        header={
          <FrontDeskHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        }
      />
    </Layout>
  );
};

Resevation.propTypes = {
  reservation: PropTypes.node,
};

export default Resevation;
