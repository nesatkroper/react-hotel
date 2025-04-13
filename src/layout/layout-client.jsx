import FooterClient from "@/components/app/client/footer";
import HeaderClient from "@/components/app/client/header";
import PropTypes from "prop-types";
import React from "react";

const LayoutClient = ({ children, className }) => {
  return (
    <div className={`relative flex flex-col ${className}`}>
      <HeaderClient />
      <div className='md:container md:mx-auto px-4 bar-none'>{children}</div>
      <FooterClient />
    </div>
  );
};

LayoutClient.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default LayoutClient;
