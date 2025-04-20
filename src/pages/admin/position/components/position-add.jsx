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
import { FormComboBox, FormInput, FormTextArea } from "@/components/app/form";
import { toast } from "sonner";
import { handleSendNotification } from "@/components/app/notification/handle-notification";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

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
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosAuth.post("/position", formData);

      setTimeout(() => {
        toast.dismiss(toastId);
        handleSendNotification(
          "Admin",
          "31007b7e-93da-47fb-9e6e-c6c9bc0f317d",
          "New Position Created",
          "Created"
        );
        if (response.status === 201) {
          showToast(
            `${formData.positionName} Add Successfully.`,
            "success",
            false,
            {
              duration: 5000,
            }
          );
        }
      }, 100);

      resetForm();
      dispatch(clearCache());
      dispatch(getPositions({ params: { status: "all", department: true } }));
    } catch (e) {
      setTimeout(() => {
        toast.dismiss(toastId);
        showToast("Error Occured", "error", false, {
          description: "Please try again.",
        });
      }, 100);

      console.log(e);
    }
  };
  return (
    <DialogContent className='max-w-[350px]'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Position Details Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-4'>
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

PositionAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default PositionAdd;
