import React, { useState } from "react";
import FormInput from "@/components/app/form/form-input";
import axiosAuth from "@/lib/axios-auth";
import Cookies from "js-cookie";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import { useFormHandler } from "@/hooks/use-form-handler";
import { showToast } from "@/components/app/toast";

const Signin = () => {
  const navigate = useNavigate();

  const { setToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { formData, resetForm, handleChange } = useFormHandler({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosAuth.post("/auth/login", formData);

      setToken(response.data.token);
      Cookies.set("user-info", JSON.stringify(response.data.auth), {
        expires: 0.4,
      });

      navigate("/home", { replace: true });
      showToast(`Welcome ${response.data.auth.email}`);
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (err.response) {
        errorMessage = err.response.data?.message || errorMessage;
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      showToast(errorMessage, "error");
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        onCallbackInput={handleChange}
        name='email'
        label='Email*'
        type='email'
        value={formData.email}
        placeholder='devnun'
        required
      />
      <FormInput
        onCallbackInput={handleChange}
        name='password'
        label='Password*'
        value={formData.password}
        type={showPassword ? "text" : "password"}
        placeholder='1234'
        mainClass='my-3'
        required
      />
      <div className='flex items-center space-x-2 mb-4'>
        <Checkbox
          id='showPassword'
          onCheckedChange={() => setShowPassword(!showPassword)}
        />
        <label
          htmlFor='showPassword'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          {showPassword ? "Hide" : "Show"} Password
        </label>
      </div>
      <Button type='submit' className='w-full'>
        {isSubmitting ? <Loader2 className='animate-spin' /> : "Sign In"}
      </Button>
    </form>
  );
};

export default Signin;
