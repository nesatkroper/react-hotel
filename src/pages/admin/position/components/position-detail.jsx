import React from "react";
import PropTypes from "prop-types";
import { Separator } from "@/components/ui/separator";

const PositionDetail = ({ item }) => {
  return (
    <>
      <Separator />
      <div className='space-y-4 mt-4'>
        {Object.entries(item).map(([key, value]) => {
          if (key === "id") return null;

          let displayValue;
          if (key === "created_at" || key === "updated_at") {
            displayValue = value
              ? new Date(value).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
              : "N/A";
          } else if (key === "status") {
            displayValue = (
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  value === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {value || "N/A"}
              </span>
            );
          } else if (typeof value === "object" && value !== null) {
            displayValue = (
              <pre className='bg-gray-100 p-2 rounded-md text-sm'>
                {JSON.stringify(value, null, 2)}
              </pre>
            );
          } else {
            displayValue = value ?? "N/A";
          }

          return (
            <div key={key} className='flex items-center space-x-2'>
              <span className='text-sm w-32 capitalize'>
                {key.replace(/_/g, " ")}:
              </span>
              <span className='text-sm capitalize'>{displayValue}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

PositionDetail.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PositionDetail;
