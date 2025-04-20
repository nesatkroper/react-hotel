import React from "react";
import axiosInstance from "@/lib/axios-instance";
import FormInput from "@/components/app/form/form-input";
import PropTypes from "prop-types";
import FormTextArea from "@/components/app/form/form-textarea";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { apiUrl } from "@/constants/api";
import { getCategorys } from "@/contexts/reducer/product-category-slice";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useFormHandler } from "@/hooks/use-form-handler";

const CategoryEdit = ({ items }) => {
  const dispatch = useDispatch();

  const {
    formData,
    getFormDataForSubmission,
    handleChange,
    handleImageData,
    resetForm,
  } = useFormHandler({
    picture: items.picture,
    category_name: items.categoryName,
    category_code: items.categoryCode,
    memo: items.memo,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const submissionData = getFormDataForSubmission();
      await axiosInstance.put(`/category/${items.categoryId}`, submissionData);

      resetForm();
      dispatch(getCategorys());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DialogContent className='max-w-[500px]'>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle className='text-md'>
            Product Category Details Information
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='grid sm:grid-cols-2 gap-3'>
          <FormInput
            onCallbackInput={handleChange}
            name='categoryName'
            value={items.categoryName || ""}
            label='Category Name'
          />
          <FormInput
            onCallbackInput={handleChange}
            name='categoryCode'
            value={items.categoryCode.toUpperCase()}
            label='Category Code'
            readonly={true}
          />
          <FormTextArea
            onCallbackInput={handleChange}
            label='Description'
            name='memo'
            value={items.memo || "N/A"}
          />
          <FormImageResize
            onCallbackFormData={handleImageData}
            resolution={600}
          />
          <FormImagePreview
            imgSrc={
              items.picture
                ? `${apiUrl}/uploads/${items.picture}`
                : formData.picture
                ? URL.createObjectURL(formData.picture)
                : null
            }
          />
        </div>
        <DialogClose className='mt-2' asChild>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

CategoryEdit.propTypes = {
  items: PropTypes.object,
};

export default CategoryEdit;
