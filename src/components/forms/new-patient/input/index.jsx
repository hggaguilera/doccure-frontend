import React from "react";

function Input({ name, label, type, register, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        className={error ? "form-control input-error" : "form-control"}
        {...register(name)}
      />
      {error && <p className="invalid">{error}</p>}
    </div>
  );
}

export default Input;
