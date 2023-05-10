import React from "react";

function Input({ name, label, register, error, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="password"
        className={error ? "form-control input-error" : "form-control"}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="invalid">{error}</p>}
    </div>
  );
}

export default Input;
