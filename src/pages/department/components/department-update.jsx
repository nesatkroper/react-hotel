import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDepartments } from "@/app/reducer/department-slice";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormTextArea from "@/components/app/form/form-textarea";
import axiosAuth from "@/providers/axios-auth";

const DepartmentUpdate = ({ items }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    department_name: items.department_name,
    department_code: items.department_code,
    memo: items.memo,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosAuth
        .put(`/department/${items.department_id}`, formData)
        .then((res) => {
          console.log(res);
          dispatch(getDepartments());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(formData);

  return (
    <>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Department Update Information.</DialogTitle>
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
              value={`DEP-${formData.department_code
                .toString()
                .padStart(3, "0")}`}
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
    </>
  );
};

DepartmentUpdate.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default DepartmentUpdate;
