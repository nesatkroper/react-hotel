import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import TimelineHeader from "./timeline-header";
import TimelineGrid from "./timeline-grid";
import PropTypes from "prop-types";

const Timeline = ({ reservation }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1));
  const rooms = ["Room D1", "Room D2", "Room D3", "Room D4"];

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className='p-2 '>
      <TimelineGrid
        currentDate={currentDate}
        rooms={rooms}
        header={
          <TimelineHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        }
        reservation={reservation}
      />
    </div>
  );
};

Timeline.propTypes = {
  reservation: PropTypes.node,
};

export default Timeline;
