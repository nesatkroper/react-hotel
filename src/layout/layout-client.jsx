import FooterClient from "@/components/app/footer-client";
import HeaderClient from "@/components/app/header-client";
import PropTypes from "prop-types";
import React from "react";

const LayoutClient = ({ children }) => {
  return (
    <div className='relative flex flex-col '>
      <HeaderClient />
      <div className='md:container md:mx-auto px-4'>{children}</div>
      <FooterClient />
    </div>
  );
};

LayoutClient.propTypes = {
  children: PropTypes.element,
};

export default LayoutClient;
