import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { clearCache, getPositions } from "@/contexts/reducer/position-slice";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { showToast } from "@/components/app/toast";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FormComboBox, FormInput, FormTextArea } from "@/components/app/form";

const PositionAdd = () => {
  const dispatch = useDispatch();
  const { data: depData } = useSelector((state) => state.departments);
  const { formData, resetForm, handleChange } = useFormHandler({
    departmentId: 0,
    positionName: "",
    memo: "",
  });

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosAuth
        .post("/position", formData)
        .then((res) => {
          console.log(res);
          showToast(`${formData.positionName} Add Successfully.`, "success");
          resetForm();
          dispatch(clearCache());
          dispatch(
            getPositions({ params: { status: "all", department: true } })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Position Details Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='flex justify-between mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            name='positionName'
            value={formData.departmentName}
            label='Position Name*'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormComboBox
            onCallbackSelect={(val) => handleChange("departmentId", val)}
            name='departmentId'
            label='Department'
            item={depData}
            optID='departmentId'
            optLabel='departmentName'
          />
        </div>

        <FormTextArea
          onCallbackInput={handleChange}
          label='Decription'
          name='memo'
          placeholder='N/A'
        />

        <DialogClose asChild>
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

PositionAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default PositionAdd;
