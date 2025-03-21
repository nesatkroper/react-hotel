import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPositions } from "@/contexts/reducer/position-slice";
import { getEmployees } from "@/contexts/reducer/employee-slice";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormSelect from "@/components/app/form/form-select";
import FormDatePicker from "@/components/app/form/form-date-picker";
import FormComboBox from "@/components/app/form/form-combobox";
import axiosAuth from "@/lib/axios-auth";

const EmployeeEdit = ({ lastCode }) => {
  const dispatch = useDispatch();
  const { depData } = useSelector((state) => state.departments);
  const { posData } = useSelector((state) => state.positions);
  const [issend, setIssend] = useState(false);
  const [formData, setFormData] = useState({
    employee_code: parseInt(lastCode, 10) + 1,
    status: "active",
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    phone: "",
    position_id: "",
    department_id: "",
    salary: "",
    hired_date: "",
  });

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getPositions());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.employee_code) return "Employee code is required.";
    if (!formData.first_name) return "First name is required.";
    if (!formData.last_name) return "Last name is required.";
    if (!formData.gender) return "Gender is required.";
    if (!formData.position_id) return "Position is required.";
    if (!formData.department_id) return "Department is required.";
    if (!formData.salary) return "Salary is required.";
    return null;
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setIssend(!issend);
      validateForm();

      await axiosAuth.post("/employee", formData);
      dispatch(getEmployees({ position: true }));

      console.log(formData);
    } catch (e) {
      console.log(e);
      setIssend(!issend);
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle>Emoloyee Details Information.</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between mb-2 mt-2'>
          <FormInput
            onCallbackInput={handleChange}
            label='First Name*'
            name='first_name'
            placeholder='Jonh, ...'
            required={true}
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Last Name*'
            name='last_name'
            placeholder='Ramboo, ...'
            required={true}
          />
        </div>
        <div className='flex justify-between mb-2 mt-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='Employee Code*'
            value={`EMP-${(lastCode + 1).toString().padStart(4, "0")}`}
          />
          <FormSelect
            name='gender'
            onCallbackSelect={(event) => handleDataChange("gender", event)}
          />
        </div>
        <div className='flex justify-between mb-2 mt-2'>
          <FormInput
            onCallbackInput={handleChange}
            label='Phone Number'
            name='phone'
            placeholder='010280202'
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Salary*'
            name='salary'
            placeholder='$250.00'
          />
        </div>
        <div className='flex justify-between mb-2 mt-2'>
          <FormDatePicker
            onCallbackPicker={(event) => handleDataChange("dob", event)}
            label='Date of Birth'
          />
          <FormDatePicker
            onCallbackPicker={(event) => handleDataChange("hired_date", event)}
            label='Hired Date'
          />
        </div>
        <div className='flex justify-between mb-2 mt-3'>
          <FormComboBox
            onCallbackSelect={(event) =>
              handleDataChange("department_id", event)
            }
            label='Department'
            item={depData}
            optID='department_id'
            optLabel='department_name'
          />
          <FormComboBox
            onCallbackSelect={(event) => handleDataChange("position_id", event)}
            label='Position'
            item={posData}
            optID='position_id'
            optLabel='position_name'
          />
        </div>
        <div className='flex justify-between mb-2 mt-3'></div>
        <DialogClose onClick={handleFormSubmit} className='mt-2'>
          <Button type='submit'>
            {issend ? <Loader2 className=' animate-spin' /> : "Submit"}
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

EmployeeEdit.propTypes = {
  lastCode: PropTypes.number,
};

export default EmployeeEdit;
