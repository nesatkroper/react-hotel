import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormDatePicker from "@/components/app/form/form-date-picker";
import FormComboBox from "@/components/app/form/form-combobox";
import axiosAuth from "@/lib/axios-auth";
import { z } from "zod";
import { getDepartments, getEmployees, getPositions } from "@/contexts/reducer";

const schema = z.object({
  first_name: z.string().nonempty("Required"),
  last_name: z.string().nonempty("Required"),
  salary: z.preprocess(
    (val) => parseFloat(val),
    z.number().positive("Salary must be > 0")
  ),
  phone: z
    .string()
    .regex(/^\d{7,15}$/, "Phone number must be 7-15 digits")
    .optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  position_id: z.string().nonempty("Position is required"),
  department_id: z.number().int(),
});

const EmployeeAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const { data: depData } = useSelector((state) => state.departments);
  const { data: posData } = useSelector((state) => state.positions);
  const [issend, setIssend] = useState(false);
  const [formData, setFormData] = useState({
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

  const validate = (data) => {
    const result = schema.safeParse(data);
    if (result.success) {
      setError({});
      return true;
    }
    setError(result.error.flatten().fieldErrors);
    return false;
  };

  const handleDataChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!validate(formData)) {
      return;
    }

    try {
      setIssend(true);
      await axiosAuth.post("/employee", formData);
      dispatch(getEmployees({ position: true }));
    } catch (e) {
      console.error("Submission error:", e);
    } finally {
      setIssend(false);
    }
  };

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getPositions());
  }, [dispatch]);

  const filteredPositions = posData.filter(
    (position) => position.department_id === Number(formData.department_id)
  );

  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className="mb-3">
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between mb-2 mt-2">
          <FormInput
            onCallbackInput={handleDataChange}
            label="First Name*"
            name="first_name"
            placeholder="John, ..."
            required
            error={error.first_name?.[0]}
          />
          <FormInput
            onCallbackInput={handleDataChange}
            label="Last Name*"
            name="last_name"
            placeholder="Doe, ..."
            required
            error={error.last_name?.[0]}
          />
        </div>
        <div className="flex justify-between mb-2 mt-3">
          <FormInput
            label="Employee Code*"
            value={`EMP-${(lastCode + 1).toString().padStart(4, "0")}`}
            disabled
          />
          <FormComboBox
            item={GENDER}
            optID="value"
            optLabel="label"
            name="gender"
            label="Gender"
            onCallbackSelect={(event) => handleDataChange("gender", event)}
            error={error.gender?.[0]}
          />
        </div>
        <div className="flex justify-between mb-2 mt-2">
          <FormInput
            onCallbackInput={handleDataChange}
            label="Phone Number"
            name="phone"
            placeholder="010280202"
            error={error.phone?.[0]}
          />
          <FormInput
            onCallbackInput={handleDataChange}
            label="Salary*"
            name="salary"
            placeholder="$250.00"
            error={error.salary?.[0]}
          />
        </div>
        <div className="flex justify-between mb-2 mt-2">
          <FormDatePicker
            onCallbackPicker={(event) => handleDataChange("dob", event)}
            label="Date of Birth*"
            error={error.dob?.[0]}
          />
          <FormDatePicker
            onCallbackPicker={(event) => handleDataChange("hired_date", event)}
            label="Hired Date*"
            error={error.hired_date?.[0]}
          />
        </div>
        <div className="flex justify-between mb-2 mt-3">
          <FormComboBox
            onCallbackSelect={(event) =>
              handleDataChange("department_id", Number(event))
            }
            label="Department*"
            item={depData}
            optID="department_id"
            optLabel="department_name"
            error={error.department_id?.[0]}
          />
          <FormComboBox
            onCallbackSelect={(event) => handleDataChange("position_id", event)}
            label="Position*"
            item={filteredPositions}
            optID="position_id"
            optLabel="position_name"
            error={error.position_id?.[0]}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" disabled={issend}>
            {issend ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

EmployeeAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default EmployeeAdd;
