import React, { useEffect, useState } from "react";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "@/contexts/reducer/employee-slice";
import { Loader2 } from "lucide-react";
import { getAuth } from "@/contexts/reducer/auth-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { FormComboBox, FormInput, FormSelect } from "@/components/app/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const ROLE = [
  {
    value: "admin",
    data: "Admin (Access all Permission)",
  },
  {
    value: "management",
    data: "Management (Allow all Data)",
  },
  {
    value: "accountant",
    data: "Accountant (Allow all Finance)",
  },
  {
    value: "sale",
    data: "Sale (For General Staff)",
  },
  {
    value: "user",
    data: "User (View Landing Only)",
  },
];

const AuthenticationAdd = () => {
  const dispatch = useDispatch();
  const { data: empData } = useSelector((state) => state.employees);
  const [issend, setIssend] = useState(false);
  const { formData, handleChange, resetForm } = useFormHandler({
    departmentId: 0,
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIssend(true);
    await axiosAuth
      .post("/auth/register", formData)
      .then((res) => {
        console.log(res);
        resetForm();
        dispatch(getAuth());
        setIssend(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <DialogContent className='max-w-[350px]'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Authentication Details Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-3 mb-3'>
          <FormComboBox
            onCallbackSelect={(e) => handleChange("departmentId", e)}
            name='departmentId'
            label='Employee'
            item={empData}
            optID='employeeId'
            optLabel='lastName'
          />
          <FormSelect
            onCallbackSelect={(e) => handleChange("role", e)}
            label='Role'
            item={ROLE}
            optID='value'
            optLabel='data'
          />

          <FormInput
            onCallbackInput={handleChange}
            name='email'
            type='email'
            label='Email*'
            placeholder='someone@something.com'
            required={true}
          />
          <FormInput
            onCallbackInput={handleChange}
            name='password'
            label='Password*'
            placeholder='1234'
            required={true}
          />
        </div>
        <DialogClose asChild>
          <Button type='submit' className='w-full'>
            {issend ? <Loader2 className=' animate-spin' /> : "Submit"}
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default AuthenticationAdd;
