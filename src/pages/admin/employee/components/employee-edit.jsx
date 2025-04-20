import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getPositions } from "@/contexts/reducer/position-slice";
import { getEmployees } from "@/contexts/reducer/employee-slice";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { Loader2 } from "lucide-react";
import { useFormHandler } from "@/hooks/use-form-handler";
import { GENDER } from "@/utils/default-data";
import { clearCache } from "@/contexts/reducer/bank-note-slice";
import { FormComboBox, FormDatePicker, FormInput } from "@/components/app/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const EmployeeEdit = ({ item = {} }) => {
  const dispatch = useDispatch();
  const { data: depData } = useSelector((state) => state.departments);
  const { data: posData } = useSelector((state) => state.positions);
  const [issend, setIssend] = useState(false);
  const { formData, resetForm, handleChange } = useFormHandler({
    status: item?.status,
    firstName: item?.firstName,
    lastName: item?.lastName,
    gender: item?.gender,
    dob: item?.dob,
    phone: item?.phone,
    positionId: item?.positionId,
    departmentId: item?.departmentId,
    salary: item?.salary,
    hiredDate: item?.hiredDate,
  });

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setIssend(!issend);

      await axiosAuth
        .put(`/employee/${item.employeeId}`, formData)
        .then((res) => {
          console.log(res);
          resetForm();
          dispatch(clearCache());
          dispatch(getEmployees({ position: true }));
        });
    } catch (e) {
      console.log(e);
      setIssend(!issend);
    }
  };

  const filteredPositions = posData?.filter(
    (pos) => pos.departmentId === formData.departmentId
  );

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getPositions());
  }, [dispatch]);

  return (
    <DialogContent className='max-w-[500px]'>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle className='text-md'>Employee Edit Details</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='grid sm:grid-cols-2 gap-3 mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='First Name*'
            name='firstName'
            value={item.firstName}
            required
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Last Name*'
            name='lastName'
            value={item?.lastName}
            required
          />

          <FormComboBox
            item={GENDER}
            optID='value'
            optLabel='label'
            name='gender'
            label='Gender'
            onCallbackSelect={(event) => handleChange("gender", event)}
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Phone Number'
            name='phone'
            placeholder='010280202'
          />

          <FormDatePicker
            onCallbackPicker={(event) => handleChange("dob", event)}
            label='Date of Birth*'
          />
          <FormDatePicker
            onCallbackPicker={(event) => handleChange("hiredDate", event)}
            label='Hired Date*'
          />

          <FormComboBox
            onCallbackSelect={(event) => handleChange("departmentId", event)}
            label='Department*'
            item={depData}
            optID='departmentId'
            optLabel='departmentName'
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("positionId", event)}
            label='Position*'
            item={filteredPositions}
            optID='positionId'
            optLabel='positionName'
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Salary*'
            name='salary'
            placeholder='$250.00'
          />
        </div>
        <DialogClose asChild>
          <Button type='submit' disabled={issend} className='w-full'>
            {issend ? <Loader2 className='animate-spin' /> : "Submit"}
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

EmployeeEdit.propTypes = {
  item: PropTypes.object,
};

export default EmployeeEdit;
