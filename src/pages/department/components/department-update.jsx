import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch } from "react-redux";
import { clearCache, getDepartments } from "@/app/reducer/department-slice";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormTextArea from "@/components/app/form/form-textarea";
import axiosAuth from "@/providers/axios-auth";
import { useFormHandler } from "@/components/hooks/use-form-handler";

const DepartmentUpdate = ({ items = {} }) => {
  const dispatch = useDispatch();
  const { formData, handleChange, resetForm } = useFormHandler({
    department_name: items?.department_name || "",
    memo: items?.memo || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosAuth.put(`/department/${items.department_id}`, formData);
      resetForm(), dispatch(clearCache());
      dispatch(getDepartments({ status: "all" }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Department Update Information</DialogTitle>
        </DialogHeader>
        <Separator className="my-3" />
        <div className="flex justify-between mb-3">
          <FormInput
            onCallbackInput={handleChange}
            name="department_name"
            value={formData.department_name}
            label="Department Name*"
            type="text"
            placeholder="IT, Finance, ..."
            required={true}
          />
          <FormInput label="Department Code*" value={items.department_code} />
        </div>
        <FormTextArea
          onCallbackInput={handleChange}
          label="Description"
          name="memo"
          placeholder="N/A"
          value={formData.memo}
        />
        <DialogClose>
          <Button type="submit" className="w-full">
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
