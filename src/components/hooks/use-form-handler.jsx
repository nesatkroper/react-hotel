import { useState } from "react";

export const useFormHandler = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  // const handleChange = (name, value) => {
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (eventOrName, value) => {
    if (typeof eventOrName === "string") {
      setFormData((prev) => ({ ...prev, [eventOrName]: value }));
    } else if (eventOrName.target) {
      const { name, value } = eventOrName.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, handleChange, setFormData, resetForm };
};
