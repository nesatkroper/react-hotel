import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import React from "react";

const FormInput = ({
  onCallbackInput,
  name,
  value,
  type = "text",
  mainClass,
  inputClass,
  labelClass,
  placeholder = "Food, Drink, ...",
  label = "Email*",
  readonly = false,
  required = false,
  min = 0,
  step = 0.01,
  error,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onCallbackInput(name, value);
  };

  return (
    <div className={`columns-1 ${mainClass}`}>
      <Label className={`${labelClass}`}>{label}</Label>
      <Input
        onChange={handleChange}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${inputClass}`}
        readOnly={readonly}
        min={min}
        step={step}
        required={required}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

FormInput.propTypes = {
  onCallbackInput: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  mainClass: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
  readonly: PropTypes.bool,
  min: PropTypes.number,
  step: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.string,
};

export default FormInput;
