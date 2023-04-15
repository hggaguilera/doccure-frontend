import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./input";

function LoginForm({ register, handleSubmit, onSubmit, errors, disabled }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="username"
        label="Correo Electronico"
        type="text"
        register={register}
        placeholder="jane.doe@msdental.com"
        error={errors?.username?.message}
      />
      <Input
        name="password"
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        register={register}
        placeholder="123456"
        enableShowPassword
        onShowPasswordClick={() => setShowPassword(!showPassword)}
        error={errors?.password?.message}
      />
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="custom_check mr-2 mb-0 d-inline-flex">
              Recuerdame
              <input type="checkbox" name="radio" />
              <span className="checkmark" />
            </label>
          </div>
          <div className="col-6 text-end">
            <Link className="forgot-link" to="/auth/forgot-password">
              Se te olvido tu contraseña?
            </Link>
          </div>
        </div>
      </div>
      <div className="d-grid">
        <button className="btn btn-primary" type="submit" disabled={disabled}>
          Iniciar Sesion
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
