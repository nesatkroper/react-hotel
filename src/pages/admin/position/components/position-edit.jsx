import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { clearCache, getPositions } from "@/contexts/reducer/position-slice";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FormComboBox, FormInput, FormTextArea } from "@/components/app/form";

const PositionEdit = ({ items = {} }) => {
  const dispatch = useDispatch();
  const { data: depData } = useSelector((state) => state.departments);

  const { formData, handleChange } = useFormHandler({
    departmentId: items?.departmentId || "",
    positionName: items?.positionName || "",
    memo: items?.memo || "",
  });

  console.table(items);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosAuth.put(`/position/${items.positionId}`, formData);

    dispatch(clearCache());
    dispatch(getPositions({ status: "all", department: true }));
  };
  return (
    <DialogContent className='max-w-[350px]'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Position Edit Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-4'>
          <FormInput
            onCallbackInput={handleChange}
            name='positionName'
            value={formData.positionName}
            label='Position Name*'
            placeholder='IT, Finance, ...'
            required
          />
          <FormInput
            inputClass='uppercase'
            label='Position Code'
            value={items.positionCode}
            readonly
          />

          <FormComboBox
            onCallbackSelect={(val) => handleChange("departmentId", val)}
            name='departmentId'
            label='Department'
            item={depData || []}
            optID='departmentId'
            optLabel='departmentName'
            defaultValue={items?.departmentId || ""}
          />

          <FormTextArea
            onCallbackInput={handleChange}
            label='Decription'
            name='memo'
            placeholder='N/A'
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

PositionEdit.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PositionEdit;
