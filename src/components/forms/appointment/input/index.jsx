import React from "react";

function Input({ name, label, type, register, error, placeholder, tooltip }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {tooltip && (
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-title={tooltip}
          className="tooltip-info"
        >
          <i className="fa fa-exclamation" />
        </span>
      )}
      <input
        id={name}
        type={type}
        className={error ? "form-control input-error" : "form-control"}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="invalid">{error}</p>}
    </div>
  );
}

export default Input;
