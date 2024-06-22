// src/hooks/useForm.js
import { useState, useEffect } from "react";

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
