import React from "react";

function Input({
  name,
  label,
  type,
  register,
  error,
  placeholder,
  enableShowPassword,
  onShowPasswordClick,
}) {
  return (
    <div className="form-group form-focus">
      <label htmlFor={name} className="visually-hidden">
        {label}
      </label>
      {enableShowPassword ? (
        <div className="pass-group">
          <input
            id={name}
            type={type}
            className={error ? "form-control floating error-input" : "form-control floating"}
            placeholder={placeholder}
            {...register(name)}
          />
          <span
            role="button"
            tabIndex={-1}
            aria-label="Show Password"
            onClick={onShowPasswordClick}
            onKeyDown={onShowPasswordClick}
            className={`fa toggle-password" ${type === "password" ? "fa-eye-slash" : "fa-eye"}`}
          />
        </div>
      ) : (
        <input
          id={name}
          type={type}
          className={error ? "form-control floating error-input" : "form-control floating"}
          placeholder={placeholder}
          {...register(name)}
        />
      )}
      {error && <p className="invalid">{error}</p>}
    </div>
  );
}

export default Input;
