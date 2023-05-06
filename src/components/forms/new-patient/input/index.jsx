import React from "react";

function Input({ name, label, placeholder, type, register, error, readOnly = false }) {
  return (
    <div className={error ? "form-group error" : "form-group"}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="form-control"
        readOnly={readOnly}
        {...register(name)}
      />
    </div>
  );
}

export default Input;
