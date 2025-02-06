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
import { getDepartments } from "@/app/reducer/department-slice";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormTextArea from "@/components/app/form/form-textarea";
import axiosAuth from "@/providers/axios-auth";

const PositionAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const { depData } = useSelector((state) => state.departments);
  const [formData, setFormData] = useState({
    department_id: 0,
    position_name: "",
    position_code: parseInt(lastCode, 10) + 1,
    memo: "",
  });

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  // console.log(formData);

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
      .post("/position", formData)
      .then((res) => {
        console.log(res);
        dispatch(getPositions());
        setFormData({
          department_id: 0,
          position_name: "",
          position_code: lastCode + 1,
          memo: "",
        });
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
            value={formData.department_name}
            label="Position Name*"
            placeholder="IT, Finance, ..."
            required={true}
          />
          <FormInput
            label="Position Code"
            value={`POS-${formData.position_code.toString().padStart(3, "0")}`}
          />
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

PositionAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default PositionAdd;
