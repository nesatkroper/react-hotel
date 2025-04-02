import FormInput from "@/components/app/form/form-input";
import axiosAuth from "@/lib/axios-auth";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { useDispatch } from "react-redux";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const { setToken } = useAuth();
  const [otp, setOtp] = useState("");
  const [isMail, setIsMail] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (!isComplete)
      if (isValidEmail(formData.email)) setIsMail(true);
      else setIsMail(false);
  };

  const handleOtp = async () => {
    if (!isSend)
      await axiosAuth
        .post("/mail/send", { email: formData.email })
        .then((res) => {
          setIsSend(true);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    else
      await axiosAuth
        .post("/mail/verify", { email: formData.email, otp: otp })
        .then((res) => {
          setIsComplete(true);
          setIsSend(false);
          setIsMail(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosAuth
      .post("/register", formData)
      .then((res) => {
        console.log(res);

        navigate("/auth", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        onCallbackInput={handleChange}
        name='email'
        label='Email*'
        type='email'
        placeholder='someone@something.com'
        mainClass='my-2'
        inputClass={isComplete ? "border-green-500" : ""}
        labelClass={isComplete ? "text-green-500" : ""}
        required={true}
        readonly={isComplete ? true : false}
      />
      <div className='flex justify-end gap-3 mb-2'>
        {isSend ? (
          <InputOTP
            maxLength={6}
            name='otp'
            onChange={(e) => {
              setOtp(e);
            }}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
        ) : (
          ""
        )}
        {isMail ? (
          <Button type='button' onClick={handleOtp} className='px-3'>
            {isSend ? "Verify" : "Send OTP"}{" "}
          </Button>
        ) : (
          ""
        )}
      </div>
      {isComplete ? (
        <div>
          <FormInput
            onCallbackInput={handleChange}
            name='password'
            label='Password'
            type={show ? "password" : "text"}
            placeholder='1234'
            mainClass='my-2'
            required={true}
          />
          <div className='flex items-center space-x-2 mb-4'>
            <Checkbox onCheckedChange={handleShowPassword} id='terms' />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              {show ? "Hide" : "Show"} Password
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
      {isComplete ? (
        <Button type='submit' className='w-full'>
          Sign Up
        </Button>
      ) : (
        ""
      )}
    </form>
  );
};

export default Signup;
