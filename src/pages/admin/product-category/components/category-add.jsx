import React, { useEffect } from "react";
import FormInput from "@/components/app/form/form-input";
import FormTextArea from "@/components/app/form/form-textarea";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { getRooms } from "@/contexts/reducer/room-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import {
  clearCacheAsync,
  getCategorys,
} from "@/contexts/reducer/product-category-slice";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const CategoryAdd = () => {
  const dispatch = useDispatch();

  const {
    formData,
    resetForm,
    handleChange,
    handleImageData,
    getFormDataForSubmission,
  } = useFormHandler({
    picture: "",
    categoryName: "",
    categoryCode: "",
    memo: "",
    status: "active",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = getFormDataForSubmission();
      await axiosInstance.post("/category", submissionData);

      resetForm();
      dispatch(clearCacheAsync());
      dispatch(getCategorys());

      console.log(formData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <DialogContent className='max-w-[500px] p-4'>
      <form onSubmit={handleFormSubmit} className='space-y-4'>
        <DialogHeader>
          <DialogTitle className='text-md'>Category Details</DialogTitle>
        </DialogHeader>
        <Separator />

        <div className='grid sm:grid-cols-2 gap-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='Product Category Name*'
            name='categoryName'
            type='text'
          />
          <FormImageResize
            onCallbackFormData={handleImageData}
            resolution={400}
          />
          <FormTextArea
            onCallbackInput={handleChange}
            name='memo'
            label='Description'
          />
          <FormImagePreview
            imgSrc={
              formData.picture ? URL.createObjectURL(formData.picture) : null
            }
          />
        </div>
        <DialogClose asChild>
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default CategoryAdd;
