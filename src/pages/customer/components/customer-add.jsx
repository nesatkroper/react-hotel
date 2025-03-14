import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormComboBox,
  FormImagePreview,
  FormImageResize,
  FormInput,
} from "@/components/app/form";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import { z } from "zod";
import { clearCache, getCustomers } from "@/app/reducer/customer-slice";
import { useFormHandler } from "@/components/hooks/use-form-handler";
import PropTypes from "prop-types";
import axiosInstance from "@/providers/axios-instance";

const schema = z.object({
  first_name: z.string().nonempty("Required"),
  last_name: z.string().nonempty("Required"),
  gender: z.enum(["male", "female", "other"]).optional(),
});

const CustomerAdd = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const { data: depData } = useSelector((state) => state.departments);
  const [issend, setIssend] = useState(false);
  const {
    formData,
    resetForm,
    handleChange,
    handleImageData,
    getFormDataForSubmission,
  } = useFormHandler({
    status: "active",
    picture: null,
    first_name: "",
    last_name: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!validate(formData)) {
      return;
    }

    try {
      const submissionData = getFormDataForSubmission();
      setIssend(true);
      await axiosInstance.post("/customer", submissionData);

      resetForm();
      dispatch(clearCache());
      dispatch(getCustomers());
    } catch (e) {
      console.error("Submission error:", e);
    } finally {
      setIssend(false);
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className="mb-3">
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between mb-2 mt-2">
          <FormInput
            onCallbackInput={handleChange}
            label="First Name*"
            name="first_name"
            placeholder="John, ..."
            required
            error={error.first_name?.[0]}
          />
          <FormInput
            onCallbackInput={handleChange}
            label="Last Name*"
            name="last_name"
            placeholder="Doe, ..."
            required
            error={error.last_name?.[0]}
          />
        </div>
        <div className="flex justify-between mb-2 mt-3">
          <FormComboBox
            item={GENDER}
            optID="value"
            optLabel="label"
            name="gender"
            label="Gender"
            onCallbackSelect={(event) => handleChange("gender", event)}
            error={error.gender?.[0]}
          />
          <FormInput
            onCallbackInput={handleChange}
            label="Phone Number*"
            name="phone"
            type="number"
            placeholder="010280202"
          />
        </div>
        <div className="flex justify-between mb-2 mt-2">
          <FormInput
            label="Email*"
            name="email"
            type="email"
            placeholder="example@someone.com"
          />
          <FormInput
            onCallbackInput={handleChange}
            label="Address*"
            name="address"
            placeholder="Pouk, Pouk, Siem Reap"
          />
        </div>
        <div className="flex justify-between mb-2 mt-3">
          <FormComboBox
            onCallbackSelect={(event) =>
              handleChange("department_id", Number(event))
            }
            label="Department*"
            item={depData}
            optID="department_id"
            optLabel="department_name"
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("position_id", event)}
            label="Position*"
            optID="position_id"
            optLabel="position_name"
          />
        </div>
        <div className="flex justify-between mb-2 mt-3">
          <div className="flex flex-col gap-2">
            <Label>Choose Image</Label>
            <FormImageResize onCallbackFormData={handleImageData} />
          </div>
          {/* <FormImagePreview imgSrc={URL.createObjectURL(formData.picture)} /> */}
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

CustomerAdd.propTypes = {
  lastCode: PropTypes.number,
};

export default CustomerAdd;
