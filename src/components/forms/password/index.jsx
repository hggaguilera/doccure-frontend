import React from "react";
import Input from "./input";

function NewPassword({ register, handleSubmit, onSubmit, errors, disabled }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="password"
        label="Contraseña"
        placeholder="Nueva Contraseña"
        register={register}
        error={errors.password?.message}
      />
      <Input
        name="confirmPassword"
        label="Confirmar Contraseña"
        placeholder="Contraseña"
        register={register}
        error={errors.confirmPassword?.message}
      />
      <button type="submit" className="btn btn-primary" disabled={disabled}>
        Crear Contraseña
      </button>
    </form>
  );
}

export default NewPassword;
