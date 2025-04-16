import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getCategorys } from "@/contexts/reducer/product-category-slice";
import { FormComboBox, FormInput } from "@/components/app/form";
// import { useTranslation } from "react-i18next";

const POSSearch = () => {
  const dispatch = useDispatch();
  // const [t] = useTranslation("admin");
  const { data: pcaData } = useSelector((state) => state?.pcategories);

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  return (
    <div className='flex justify-between'>
      <div className='flex gap-6'>
        <div className='flex flex-col gap-2'>
          <FormComboBox
            item={pcaData}
            optID='categoryId'
            optLabel='categoryName'
            label='Product Category'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <FormInput label='Search ...' />
        </div>
      </div>
    </div>
  );
};

POSSearch.propTypes = {
  shift: PropTypes.bool,
};

export default POSSearch;
