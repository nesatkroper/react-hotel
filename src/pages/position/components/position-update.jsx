import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getPositions } from "@/app/reducer/position-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormTextArea from "@/components/app/form/form-textarea";
import axiosAuth from "@/providers/axios-auth";
import { getDepartments } from "@/app/reducer/department-slice";

const PositionUpdate = ({ items }) => {
  const dispatch = useDispatch();
  const { depData } = useSelector((state) => state.departments);
  const [formData, setFormData] = useState({
    department_id: items.department_id,
    position_name: items.position_name,
    position_code: items.position_code,
    memo: items.memo,
  });

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  console.log(formData);

  const handleChange = (event) => {
    if (typeof event === "string") formData.department_id = event;

    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosAuth
      .put(`/position/${items.position_id}`, formData)
      .then((res) => {
        console.log(res);
        dispatch(getPositions());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Position Details Information.</DialogTitle>
        </DialogHeader>
        <Separator className="my-3" />
        <div className="flex justify-between mb-3">
          <FormInput
            onCallbackInput={handleChange}
            name="position_name"
            value={formData.position_name}
            label="Position Name*"
            placeholder="IT, Finance, ..."
            required={true}
          />
          <FormInput label="Position Code" value={formData.position_code} />
        </div>
        <div className="flex justify-between mb-3">
          <FormComboBox
            onCallbackSelect={handleChange}
            name="department_id"
            label="Department"
            item={depData}
            optID="department_id"
            optLabel="department_name"
          />
          <FormTextArea
            onCallbackInput={handleChange}
            label="Decription"
            name="memo"
            mainClass="w-[250px]"
            placeholder="N/A"
          />
        </div>
        <DialogClose>
          <Button type="submit" className="w-full">
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
