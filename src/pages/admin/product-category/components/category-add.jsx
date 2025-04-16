import React, { useEffect } from "react";
import FormInput from "@/components/app/form/form-input";
import FormTextArea from "@/components/app/form/form-textarea";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
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
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle>Product Category Details Information.</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between mb-2 mt-2'>
          <FormInput
            onCallbackInput={handleChange}
            label='Product Category Name*'
            name='categoryName'
            type='text'
          />
          <div className='flex flex-col gap-2'>
            <Label>Choose Image*</Label>
            <FormImageResize
              onCallbackFormData={handleImageData}
              resolution={400}
            />
          </div>
        </div>
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

        <DialogClose className='mt-2' asChild>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default CategoryAdd;
