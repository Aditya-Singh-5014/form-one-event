// src/components/FormField.jsx
import React from "react";
import "../styles/FormField.css";

const FormField = ({ label, type, name, value, onChange, error, icon }) => (
  <div className="form-group">
    <label>{label}:</label>
    <div className="input-container">
      {icon && <span className="icon">{icon}</span>}
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
    {error && <p className="error">{error}</p>}
  </div>
);

export default FormField;
