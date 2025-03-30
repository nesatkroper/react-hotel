import React from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { useFormHandler } from "@/hooks/use-form-handler";
import { showToast } from "@/components/app/toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { FormInput, FormTextArea } from "@/components/app/form";
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

const DepartmentAdd = () => {
  const dispatch = useDispatch();
  const { formData, resetForm, handleChange } = useFormHandler({
    departmentName: "",
    memo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table(formData);
    try {
      await axiosAuth
        .post("/department", formData)
        .then((res) => {
          console.log(res);
          showToast(`${formData.departmentName} Add Successfully.`, "success");
          dispatch(clearCache());
          resetForm();
          dispatch(getDepartments({ params: { status: "all" } }));
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
          <DialogTitle>Department Details Information.</DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='flex justify-between mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            name='departmentName'
            value={formData.departmentName}
            label='Department Name*'
            type='text'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormInput
            label='Department Code*'
            name='id'
            value={`DEP-Something`}
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

DepartmentAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default DepartmentAdd;
