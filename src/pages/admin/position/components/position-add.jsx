import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { clearCache, getPositions } from "@/contexts/reducer/position-slice";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/contexts/reducer/department-slice";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormTextArea from "@/components/app/form/form-textarea";
import axiosAuth from "@/lib/axios-auth";
import { useFormHandler } from "@/hooks/use-form-handler";

const PositionAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const { data: depData } = useSelector((state) => state.departments);
  const { formData, setFormData, handleChange } = useFormHandler({
    department_id: 0,
    position_name: "",
    memo: "",
  });

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axiosAuth.post("/position", formData);

      dispatch(clearCache());
      dispatch(getPositions({ department: true }));
      setFormData({
        department_id: 0,
        position_name: "",
        memo: "",
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Position Details Information.</DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='flex justify-between mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            name='position_name'
            value={formData.department_name}
            label='Position Name*'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormInput
            label='Position Code'
            value={`POS-${(lastCode + 1).toString().padStart(4, "0")}`}
          />
        </div>
        <div className='flex justify-between mb-3'>
          <FormComboBox
            onCallbackSelect={(val) => handleChange("department_id", val)}
            name='department_id'
            label='Department'
            item={depData}
            optID='department_id'
            optLabel='department_name'
          />
          <FormTextArea
            onCallbackInput={handleChange}
            label='Decription'
            name='memo'
            mainClass='w-[250px]'
            placeholder='N/A'
          />
        </div>
        <DialogClose>
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
