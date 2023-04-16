import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginForm from "../../../components/forms/login";
import { login } from "../../../store/features/auth";
import { loginSchema } from "../../../libs/schemas";
import ColorLogo from "../../../assets/images/admin-logo.png";

import "./index.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => navigate("/admin"));
    reset();
  };

  return (
    <div className="main-wrapper">
      <div className="header d-none">
        <ul className="nav nav-tabs user-menu">
          <li className="nav-item">
            <button type="button" id="dark-mode-toggle" className="dark-mode-toggle">
              <i className="feather-sun light-mode" />
              <i className="feather-moon dark-mode" />
            </button>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-6 login-bg">
          <div className="login-banner" />
        </div>
        <div className="col-md-6 login-wrap-bg">
          <div className="login-page">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="img-logo">
                  <img src={ColorLogo} className="img-fluid" alt="Logo" />
                </div>
                <h3>Iniciar Sesión</h3>
                <p className="account-subtitle">inicia sesión en tu cuenta para continuar</p>
                <LoginForm
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  errors={errors}
                  disabled={!isValid}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
