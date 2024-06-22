// src/components/EventRegistrationForm.jsx
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaUserFriends,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useForm from "../hooks/useForm";
import FormField from "./FormField";
import Modal from "./Modal";
import "../styles/EventRegistrationForm.css";

const EventRegistrationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "No",
    guestName: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email must be a valid email address";
    }
    if (!values.age) {
      errors.age = "Age is required";
    } else if (isNaN(values.age) || values.age <= 0) {
      errors.age = "Age must be a number greater than 0";
    }
    if (values.attendingWithGuest === "Yes" && !values.guestName) {
      errors.guestName = "Guest name is required if attending with a guest";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    handleSubmit(e);
    setSubmitted(true);
  };

  const closeModal = () => {
    setSubmitted(false);
  };

  return (
    <div className="form-container">
      <h1>Event Registration Form</h1>
      <form onSubmit={onSubmit}>
        <FormField
          label="Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          icon={<FaUser />}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon={<FaEnvelope />}
        />
        <FormField
          label="Age"
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
          error={errors.age}
          icon={<FaBirthdayCake />}
        />
        <div className="form-group">
          <label>Are you attending with a guest?</label>
          <div className="input-container">
            <select
              name="attendingWithGuest"
              value={values.attendingWithGuest}
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
        {values.attendingWithGuest === "Yes" && (
          <FormField
            label="Guest Name"
            type="text"
            name="guestName"
            value={values.guestName}
            onChange={handleChange}
            error={errors.guestName}
            icon={<FaUserFriends />}
          />
        )}
        <motion.button whileTap={{ scale: 0.95 }} type="submit">
          Submit
        </motion.button>
      </form>
      {submitted && Object.keys(errors).length === 0 && (
        <Modal onClose={closeModal}>
          <h2>Submitted Data</h2>
          <p>Name: {values.name}</p>
          <p>Email: {values.email}</p>
          <p>Age: {values.age}</p>
          <p>Attending with Guest: {values.attendingWithGuest}</p>
          {values.attendingWithGuest === "Yes" && (
            <p>Guest Name: {values.guestName}</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default EventRegistrationForm;
