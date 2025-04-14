import { Separator } from "@/components/ui/separator";
import PropTypes from "prop-types";
import React from "react";

const InvoiceFooter = (props) => {
  const { method } = props;

  return (
    <div className="mt-2">
      {method == "leave" ? (
        <div className="flex flex-col h-[150px] justify-end pb-1">
          <p>Name : _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
          <Separator />
        </div>
      ) : (
        ""
      )}
      <p className="text-sm font-semibold">+855 010 280 202</p>
      <p className="text-sm">Thanks you and see you again !</p>
      <p className="text-sm">
        Systems By Developer. <b className="underline">SUON Phanun</b>
      </p>
    </div>
  );
};

InvoiceFooter.propTypes = {
  method: PropTypes.string,
};

export default InvoiceFooter;
