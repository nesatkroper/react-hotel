import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import FormInput from "@/components/app/form/form-input";
import axiosAuth from "@/providers/axios-auth";
import { setAuthData } from "@/app/reducer/role-slice";
import { useDispatch } from "react-redux";
import { getUser } from "@/app/reducer/user-slice";
import { Loader2 } from "lucide-react";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken } = useAuth();
  const [issend, setIssend] = useState(false);
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
    setIssend(true);

    try {
      await axiosAuth
        .post("/login", formData)
        .then((res) => {
          setToken(res.data.token);
          dispatch(setAuthData({ role: res.data.auth.role }));
          dispatch(getUser());
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        onCallbackInput={handleChange}
        name="email"
        label="Email*"
        type="email"
        placeholder="devnun"
        size={300}
        required={true}
      />
      <FormInput
        onCallbackInput={handleChange}
        name="password"
        label="Password*"
        type={show ? "text" : "password"}
        placeholder="1234"
        size={300}
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
        {issend ? <Loader2 className="animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
};

export default Signin;
