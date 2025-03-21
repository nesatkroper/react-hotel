import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import { getEmployees } from "@/contexts/reducer/employee-slice";
import FormSelect from "@/components/app/form/form-select";
import { Loader2 } from "lucide-react";
import axiosAuth from "@/lib/axios-auth";
import { getAuth } from "@/contexts/reducer/auth-slice";

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
  const { empData } = useSelector((state) => state.employees);
  const [issend, setIssend] = useState(false);
  const [formData, setFormData] = useState({
    department_id: 0,
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const handleChange = (eOrName, value = null) => {
    if (typeof eOrName === "object" && eOrName.target) {
      const { name, value } = eOrName.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [eOrName]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIssend(true);
    await axiosAuth
      .post("/register", formData)
      .then((res) => {
        console.log(res);
        dispatch(getAuth());
        setIssend(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Authentication Details Information.</DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='flex justify-between mb-3'>
          <FormComboBox
            onCallbackSelect={(e) => handleChange("department_id", e)}
            name='department_id'
            label='Employee'
            item={empData}
            optID='employee_id'
            optLabel='last_name'
          />
          <FormSelect
            onCallbackSelect={(e) => handleChange("role", e)}
            label='Role'
            item={ROLE}
          />
        </div>
        <div className='flex justify-between mb-3'>
          <FormInput
            onCallbackInput={(e) => handleChange(e)}
            name='email'
            type='email'
            label='Email*'
            placeholder='someone@something.com'
            required={true}
          />
          <FormInput
            onCallbackInput={(e) => handleChange(e)}
            name='password'
            label='Password*'
            placeholder='1234'
            required={true}
          />
        </div>
        <DialogClose>
          <Button type='submit' className='w-full'>
            {issend ? <Loader2 className=' animate-spin' /> : "Submit"}
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

export default AuthenticationAdd;
