import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { Loader2 } from "lucide-react";
import FormInput from "@/components/app/form/form-input";
import axiosAuth from "@/providers/axios-auth";
import Cookies from "js-cookie";

const Signin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [isSend, setIsSend] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSend(true);

    let timeoutId;
    let isTimedOut = false;

    const timeoutPromise = new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        isTimedOut = true;
        alert("Something went wrong! Login took too long. Please try again.");
        resetForm();
        resolve();
      }, 5000);
    });

    try {
      const res = await Promise.race([
        axiosAuth.post("/login", formData),
        timeoutPromise,
      ]);

      if (isTimedOut) return;

      clearTimeout(timeoutId);

      setToken(res.data.token);
      Cookies.set("user-info", JSON.stringify(res.data.auth), { expires: 1 });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      resetForm();
      setIsSend(false);
      if (!isTimedOut) {
        console.log("Login error:", err);
        alert("Login failed! Please check your credentials and try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSend(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setIsSend(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        onCallbackInput={handleChange}
        name="email"
        label="Email*"
        type="email"
        placeholder="devnun"
        required={true}
      />
      <FormInput
        onCallbackInput={handleChange}
        name="password"
        label="Password*"
        type={show ? "text" : "password"}
        placeholder="1234"
        mainClass="my-3"
        required={true}
      />
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox id="showPassword" onCheckedChange={() => setShow(!show)} />
        <label
          htmlFor="showPassword"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {show ? "Hide" : "Show"} Password
        </label>
      </div>
      <Button type="submit" className="w-full">
        {isSend ? <Loader2 className="animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
};

export default Signin;
