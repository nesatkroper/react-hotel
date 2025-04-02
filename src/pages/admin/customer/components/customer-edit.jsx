import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import { z } from "zod";
import { clearCache, getCustomers } from "@/contexts/reducer/customer-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { getCities, getStates } from "@/contexts/reducer";
import { defimg } from "@/utils/resize-crop-image";
import { apiUrl } from "@/constants/api";

const schema = z.object({
  first_name: z.string().nonempty("Required"),
  last_name: z.string().nonempty("Required"),
  gender: z.enum(["male", "female", "other"]).optional(),
});

const CustomerEdit = ({ items = {} }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const { data: sttData } = useSelector((state) => state.states);
  const { data: citData } = useSelector((state) => state.cities);
  const [issend, setIssend] = useState(false);
  const {
    formData,
    resetForm,
    handleChange,
    handleImageData,
    getFormDataForSubmission,
  } = useFormHandler({
    picture: items?.picture,
    first_name: items?.first_name,
    last_name: items?.last_name,
    gender: items?.gender,
    phone: items?.phone,
    email: items?.email,
    address: items?.address,
    city_id: items?.city_id,
    state_id: items?.state_id,
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
      await axiosInstance.put(`/customer/${items.customer_id}`, submissionData);

      resetForm();
      dispatch(clearCache());
      dispatch(getCustomers());
    } catch (e) {
      console.log("Submission error:", e);
    } finally {
      setIssend(false);
    }
  };

  useEffect(() => {
    dispatch(getStates({ status: "all" }));
    dispatch(getCities({ status: "all" }));
  }, [dispatch]);

  const filteredCity = citData.filter(
    (city) => city.state_id === Number(formData.state_id)
  );
  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between mb-2 mt-2'>
          <FormInput
            onCallbackInput={handleChange}
            label='First Name*'
            name='first_name'
            value={formData?.first_name}
            placeholder='John, ...'
            required
            error={error.first_name?.[0]}
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Last Name*'
            name='last_name'
            value={formData?.last_name}
            placeholder='Doe, ...'
            required
            error={error.last_name?.[0]}
          />
        </div>
        <div className='flex justify-between mb-2 mt-3'>
          <FormComboBox
            item={GENDER}
            optID='value'
            optLabel='label'
            name='gender'
            label='Gender'
            onCallbackSelect={(event) => handleChange("gender", event)}
            error={error.gender?.[0]}
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Phone Number*'
            name='phone'
            value={formData?.phone}
            type='number'
            placeholder='010280202'
          />
        </div>
        <div className='flex justify-between mb-2 mt-2'>
          <FormInput
            onCallbackInput={handleChange}
            label='Email*'
            name='email'
            value={formData?.email}
            type='email'
            placeholder='example@someone.com'
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Address*'
            name='address'
            value={formData?.address}
            placeholder='Pouk, Pouk, Siem Reap'
          />
        </div>
        <div className='flex justify-between mb-2 mt-3'>
          <FormComboBox
            onCallbackSelect={(event) => handleChange("state_id", event)}
            item={sttData}
            label='State*'
            optID='state_id'
            optLabel='state_name'
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("city_id", Number(event))}
            item={filteredCity}
            label='City*'
            optID='city_id'
            optLabel='city_name'
          />
        </div>
        <div className='flex justify-between mb-2 mt-3'>
          <div className='flex flex-col gap-2'>
            <Label>Choose Image</Label>
            <FormImageResize onCallbackFormData={handleImageData} />
          </div>
          <FormImagePreview
            imgSrc={
              typeof formData.picture === "string"
                ? `${apiUrl}/uploads/${formData.picture}`
                : formData.picture instanceof File
                ? URL.createObjectURL(formData.picture)
                : defimg
            }
          />
        </div>
        <div className='flex justify-end mt-4'>
          <Button type='submit' disabled={issend}>
            {issend ? <Loader2 className='animate-spin' /> : "Submit"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

CustomerEdit.propTypes = {
  items: PropTypes.object,
};

export default CustomerEdit;
