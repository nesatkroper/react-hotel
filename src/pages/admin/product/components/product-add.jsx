import React, { useEffect } from "react";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearCacheAsync, getProducts } from "@/contexts/reducer/product-slice";
import { getCategorys } from "@/contexts/reducer/product-category-slice";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useFormHandler } from "@/hooks/use-form-handler";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const { data: pcaData } = useSelector((state) => state?.pcategories);
  const {
    formData,
    handleChange,
    handleImageData,
    resetForm,
    getFormDataForSubmission,
  } = useFormHandler({
    productName: "",
    productCode: "",
    categoryId: "",
    picture: "",
    discountRate: 0,
    status: "active",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const submissionData = getFormDataForSubmission();
      await axiosInstance.post("/product", submissionData);

      resetForm();
      dispatch(clearCacheAsync());
      dispatch(getProducts());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  return (
    <DialogContent className='max-w-[500px]'>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-2'>
        <DialogHeader className='mb-0'>
          <DialogTitle className='text-md'>
            Product Details Information
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='grid sm:grid-cols-2 gap-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='Product Name*'
            name='productName'
            type='text'
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("categoryId", event)}
            label='Category*'
            item={pcaData}
            optID='categoryId'
            optLabel='categoryName'
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Price*'
            name='price'
            type='number'
            placeholder='$ 39.99'
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Discount Rate*'
            name='discountRate'
            type='number'
            placeholder='5 %'
            step={1}
          />
          <FormImageResize
            onCallbackFormData={handleImageData}
            resolution={400}
          />
          <FormImagePreview
            imgSrc={
              formData.picture ? URL.createObjectURL(formData.picture) : null
            }
          />
        </div>
        <DialogClose asChild>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default ProductAdd;
