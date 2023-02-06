import React from "react";

function Input({ name, label, type, register, error, isRequired = true }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {isRequired ? <span>*</span> : null}
      </label>
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
