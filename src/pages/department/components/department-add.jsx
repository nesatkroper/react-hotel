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
import {
  clearCache,
  getDepartments,
} from "@/contexts/reducer/department-slice";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormTextArea from "@/components/app/form/form-textarea";
import axiosAuth from "@/lib/axios-auth";
import { useFormHandler } from "@/components/hooks/use-form-handler";

const DepartmentAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const { formData, setFormData, handleChange } = useFormHandler({
    department_name: "",
    memo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosAuth
        .post("/department", formData)
        .then((res) => {
          console.log(res);
          dispatch(clearCache());
          dispatch(getDepartments({ status: "all" }));
          setFormData({
            department_name: "",
            memo: "",
          });
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
          <FormInput
            label="Department Code*"
            value={`DEP-${(lastCode + 1).toString().padStart(3, "0")}`}
          />
        </div>
        <FormTextArea
          onCallbackInput={handleChange}
          label="Decription"
          name="memo"
          placeholder="N/A"
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

DepartmentAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default DepartmentAdd;
