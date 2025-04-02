import React from "react";
import PropTypes from "prop-types";
import { Separator } from "@/components/ui/separator";
import { apiUrl } from "@/constants/api";
import { defimg } from "@/utils/resize-crop-image";

const AppDetailViewer = ({ item }) => {
  const entries = Object.entries(item).filter(
    ([key]) => key !== "id" && !key.endsWith("_id")
  );
  const midpoint = Math.ceil(entries.length / 2);
  const leftColumnEntries = entries.slice(0, midpoint);
  const rightColumnEntries = entries.slice(midpoint);

  const renderEntry = ([key, value]) => {
    let displayValue;
    if (key === "picture" || key === "info.picture") {
      displayValue = (
        <img
          src={`${apiUrl}/uploads/${value}`}
          alt={value}
          onError={(e) => (e.target.src = defimg)}
          className='h-[80px] rounded-lg'
        />
      );
    } else if (
      key === "created_at" ||
      key === "updated_at" ||
      key === "dob" ||
      key === "hired_date"
    ) {
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
    } else if (value && typeof value === "object") {
      const nameField = Object.keys(value).find(
        (k) => k === "name" || k.endsWith("_name") || k.includes("name")
      );
      displayValue = nameField ? value[nameField] : JSON.stringify(value);
    } else {
      displayValue = value ?? "N/A";
    }

    return (
      <div key={key} className='flex items-center space-x-2 mb-4'>
        <span className='text-sm w-32 capitalize'>
          {key.replace(/_/g, " ")}:
        </span>
        <span className='text-sm capitalize'>{displayValue}</span>
      </div>
    );
  };

  return (
    <>
      <Separator />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        <div className='space-y-4'>{leftColumnEntries.map(renderEntry)}</div>
        <div className='space-y-4'>{rightColumnEntries.map(renderEntry)}</div>
      </div>
    </>
  );
};

AppDetailViewer.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AppDetailViewer;
