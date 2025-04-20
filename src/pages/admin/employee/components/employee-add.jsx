import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import { useFormHandler } from "@/hooks/use-form-handler";
import { clearCache } from "@/contexts/reducer/employee-slice";
import { getDepartments, getEmployees, getPositions } from "@/contexts/reducer";
import { FormComboBox, FormDatePicker, FormInput } from "@/components/app/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const EmployeeAdd = () => {
  const dispatch = useDispatch();
  const [issend, setIssend] = useState(false);
  const { data: depData } = useSelector((state) => state.departments);
  const { data: posData } = useSelector((state) => state.positions);
  const { formData, resetForm, handleChange } = useFormHandler({
    status: "active",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    positionId: "",
    departmentId: "",
    salary: "",
    hiredDate: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIssend(true);
      await axiosAuth.post("/employee", formData).then((res) => {
        console.log(res);
        resetForm();
        dispatch(clearCache());
        getEmployees({ params: { status: "all", info: true, position: true } });
      });
    } catch (e) {
      console.error("Submission error:", e);
    } finally {
      setIssend(false);
    }
  };

  useEffect(() => {
    dispatch(getDepartments({ params: { positions: true } }));
    dispatch(getPositions());
  }, [dispatch]);

  const filteredPositions = posData.filter(
    (pos) => pos.departmentId === formData.departmentId
  );

  return (
    <DialogContent className='max-w-[500px]'>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>Employee Details</DialogTitle>
        </DialogHeader>
        <Separator className='my-2' />
        <div className='grid sm:grid-cols-2 gap-3 mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='First Name*'
            name='firstName'
            placeholder='John, ...'
            required
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Last Name*'
            name='lastName'
            placeholder='Doe, ...'
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

EmployeeAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default EmployeeAdd;
