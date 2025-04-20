import React from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  clearCache,
  getDepartments,
} from "@/contexts/reducer/department-slice";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useFormHandler } from "@/hooks/use-form-handler";
import { FormInput, FormTextArea } from "@/components/app/form";

const DepartmentUpdate = ({ items = {} }) => {
  const dispatch = useDispatch();
  const { formData, handleChange, resetForm } = useFormHandler({
    departmentName: items?.departmentName || "",
    memo: items?.memo || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosAuth.put(`/department/${items.departmentId}`, formData);
      resetForm();
      dispatch(clearCache());
      dispatch(getDepartments({ status: "all" }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DialogContent className='max-w-[350px]'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Department Update Information</DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-4'>
          <FormInput
            onCallbackInput={handleChange}
            name='departmentName'
            value={formData.departmentName}
            label='Department Name*'
            type='text'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormInput label='Department Code*' value={items.departmentCode} />
          <FormTextArea
            onCallbackInput={handleChange}
            label='Description'
            name='memo'
            placeholder='N/A'
            value={formData.memo}
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

DepartmentUpdate.propTypes = {
  items: PropTypes.object,
};

export default DepartmentUpdate;
