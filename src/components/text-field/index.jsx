import React from "react";

function TextField({ name, label, placeholder, register, error }) {
  return (
    <div className={error ? "form-group error" : "form-group"}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        className="form-control"
        placeholder={placeholder}
        rows={6}
        {...register(name)}
      />
    </div>
  );
}

export default TextField;
