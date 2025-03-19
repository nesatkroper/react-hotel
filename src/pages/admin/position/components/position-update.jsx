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

const PositionUpdate = ({ items }) => {
  const dispatch = useDispatch();
  const { data: depData } = useSelector((state) => state.departments);

  const { formData, handleChange } = useFormHandler({
    department_id:
      items?.department_id ||
      (depData.length > 0 ? depData[0].department_id : ""),
    position_name: items?.position_name || "",
    memo: items?.memo || "",
  });

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosAuth.put(`/position/${items.position_id}`, formData);

    dispatch(clearCache());
    dispatch(getPositions({ status: "all", department: true }));
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
            value={formData.position_name}
            label='Position Name*'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormInput label='Position Code' value={items.position_code} />
        </div>
        <div className='flex justify-between mb-3'>
          <FormComboBox
            onCallbackSelect={(val) => handleChange("department_id", val)}
            name='department_id'
            label='Department'
            item={depData || []}
            optID='department_id'
            optLabel='department_name'
            defaultValue={items?.department_id || ""}
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

PositionUpdate.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PositionUpdate;
