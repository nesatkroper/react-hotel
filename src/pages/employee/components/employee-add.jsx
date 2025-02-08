import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPositions } from "@/app/reducer/position-slice";
import { getEmployees } from "@/app/reducer/employee-slice";
import axiosInstance from "@/providers/axiosInstance";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormSelect from "@/components/app/form/form-select";
import FormDatePicker from "@/components/app/form/form-date-picker";
import FormComboBox from "@/components/app/form/form-combobox";
import { Loader2 } from "lucide-react";
import { getDepartments } from "@/app/reducer/department-slice";

const EmployeeAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const { depData } = useSelector((state) => state?.departments);
  const { posData } = useSelector((state) => state?.positions);
  const [issend, setIssend] = useState(false);
  const [formData] = useState(() => {
    const form = new FormData();
    form.append("employee_code", parseInt(lastCode, 10) + 1);
    form.append("status", "active");
    form.append("first_name", "");
    form.append("last_name", "");
    form.append("gender", "");
    form.append("dob", "");
    form.append("phone", "");
    form.append("position_id", 0);
    form.append("department_id", 1);
    form.append("salary", 0);
    form.append("hired_date", 0);
    return form;
  });

  useEffect(() => {
    dispatch(getPositions());
    dispatch(getDepartments());
  }, [dispatch]);

  const handleFormData = (event) => {
    if (event instanceof FormData) {
      for (let [key, value] of event.entries()) {
        console.log(`Key: ${key}, Value:`, value);
        formData.set(key, value);
      }
    } else if (event?.target) {
      const { name, value } = event.target;
      formData.set(name, value);
    } else {
      console.log("Unexpected event structure:", event);
    }
    return formData;
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setIssend(!issend);

      await axiosInstance
        .post("/employee", formData)
        .then((res) => {
          console.log(res);
          dispatch(getEmployees());
        })
        .catch((error) => {
          setIssend(false);
          console.log("Error submitting form:", error);
        });
      console.log(formData);
    } catch (e) {
      console.log(e);
      setIssend(!issend);
    }
  };

  console.log(lastCode);

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Emoloyee Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <FormInput
              onCallbackInput={handleFormData}
              label="First Name*"
              name="first_name"
              placeholder="Jonh, ..."
              required={true}
            />
            <FormInput
              onCallbackInput={handleFormData}
              label="Last Name*"
              name="last_name"
              placeholder="Ramboo, ..."
              required={true}
            />
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <FormInput
              onCallbackInput={handleFormData}
              label="Employee Code*"
              value={`EMP-${(lastCode + 1).toString().padStart(4, "0")}`}
            />
            <FormSelect
              name="gender"
              onCallbackSelect={(e) => formData.set("gender", e)}
            />
          </div>
          <div className="flex justify-between mb-2 mt-2">
            <FormInput
              onCallbackInput={handleFormData}
              label="Phone Number"
              name="phone"
              placeholder="010280202"
            />
            <FormInput
              onCallbackInput={handleFormData}
              label="Salary*"
              name="salary"
              placeholder="$250.00"
            />
          </div>
          <div className="flex justify-between mb-2 mt-2">
            <FormDatePicker
              onCallbackPicker={(e) => formData.set("dob", e)}
              label="Date of Birth"
            />
            <FormDatePicker
              onCallbackPicker={(e) => formData.set("hired_date", e)}
              label="Hired Date"
            />
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <FormComboBox
              onCallbackSelect={(e) => formData.set("department_id", e)}
              label="Department"
              item={depData}
              optID="department_id"
              optLabel="department_name"
            />
            <FormComboBox
              onCallbackSelect={(e) => formData.set("position_id", e)}
              label="Position"
              item={posData}
              optID="position_id"
              optLabel="position_name"
            />
          </div>
          <div className="flex justify-between mb-2 mt-3"></div>
          <DialogClose onClick={handleFormSubmit} className="mt-2">
            <Button type="submit">
              {issend ? <Loader2 className=" animate-spin" /> : "Submit"}
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

EmployeeAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default EmployeeAdd;
