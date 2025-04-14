import { CardHeader, CardTitle } from "@/components/ui/card";
import { defimg } from "@/utils/resize-crop-image";
import { PropTypes } from "prop-types";
import React from "react";

const InvoiceHeader = (props) => {
  const { logo, brand } = props;
  return (
    <CardHeader className="pb-2 pt-3">
      <CardTitle className=" flex flex-col items-center gap-2">
        <p className="text-lg">{brand}</p>
        <img
          src={logo || defimg}
          onError={defimg}
          alt="logo"
          className="w-[100px] rounded-lg my-0"
        />
        <p className="text-lg underline ">INVOICE</p>
      </CardTitle>
    </CardHeader>
  );
};

InvoiceHeader.propTypes = {
  logo: PropTypes.string,
  brand: PropTypes.string,
};

InvoiceHeader.defaultProps = {
  brand: "Hotel Pom Jee Heang",
};

export default InvoiceHeader;
