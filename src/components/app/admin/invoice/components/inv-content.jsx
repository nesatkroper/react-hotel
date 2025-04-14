import React from "react";
import { datetimeNow } from "@/utils/dec-format";
import PropTypes from "prop-types";

const InvoiceContent = (props) => {
  const { room, table, ref, optD, optT, payment = "Cash" } = props;

  return (
    <div className="flex flex-col px-1 mb-2">
      <div className="flex justify-between">
        <p className="text-sm">ROOM :</p>
        <p className="font-bold text-sm">{room ?? "Room-101"}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">TABLE :</p>
        <p className="font-bold text-sm">{table ?? "Z6 T06"}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">INVNUM :</p>
        <p className="font-bold text-sm">{ref ?? "REF.S-000-0001"}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">OPE-D :</p>
        <p className="font-bold text-sm">{optD ?? "0005"}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">OPT Type :</p>
        <p className="font-bold text-sm">{optT ?? "HOTEL"}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">DATATIME :</p>
        <p className="font-bold text-sm">{datetimeNow(true, true)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">PAYMENT METHOD :</p>
        <p className="font-bold text-sm capitalize">{payment}</p>
      </div>
    </div>
  );
};

InvoiceContent.propTypes = {
  table: PropTypes.string.isRequired,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  optD: PropTypes.string.isRequired,
  optT: PropTypes.string.isRequired,
  room: PropTypes.string,
  payment: PropTypes.string,
};

export default InvoiceContent;
