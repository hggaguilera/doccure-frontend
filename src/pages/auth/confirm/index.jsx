/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { user } from "@/store/features/auth";
import { passwordSchema } from "../../../libs/schemas";

import styles from "./styles.module.css";
import NewPassword from "@/components/forms/password";

function Confirm() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isTokenValid, setIsTokenValid] = useState();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    const token = searchParams.get("token");

    dispatch(user({ token, password: data.password }))
      .unwrap()
      .then(() => {
        setPasswordSuccess(true);
      });
    reset();
  };

  useEffect(() => {
    const validateToken = () => {
      const token = searchParams.get("token");

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        setIsTokenValid(false);
        setIsLoading(false);
        return;
      }
      setIsTokenValid(true);
      setIsLoading(false);
    };

    validateToken();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner animation="grow" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}
      {isTokenValid ? (
        <div className={`container ${styles.fullHeight}`}>
          <div className={`row align-items-center ${styles.fullHeight}`}>
            <div className="col-12 col-sm-6 col-md-4 offset-md-4">
              <div className="d-flex justify-content-center mb-4">
                <p className={styles.outerRing}>
                  <span className={styles.innerRing}>
                    <i style={{ color: "#2e58ff" }} className="fas fa-key" />
                  </span>
                </p>
              </div>
              <h2 className="mb-4">Crea una nueva contraseña</h2>
              <NewPassword
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                disabled={!isValid}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={`container ${styles.fullHeight}`}>
          <div className={`row align-items-center ${styles.fullHeight}`}>
            <div className="col-12 col-sm-6 col-md-4 offset-md-4">
              <Alert
                style={{ color: "rgba(0, 0, 0, 0.5)", backgroundColor: "rgba(46, 88, 255, 0.2)" }}
              >
                <Alert.Heading>El token ha caducado</Alert.Heading>
                <p>
                  Por favor ponerse en contacto con un administrador del sistema para que le
                  proporcione un nuevo token
                </p>
              </Alert>
            </div>
          </div>
        </div>
      )}
      {passwordSuccess ? (
        <div className={`container ${styles.fullHeight}`}>
          <div className={`row align-items-center ${styles.fullHeight}`}>
            <div className="col-12 col-sm-6 col-md-4 offset-md-4">
              <div className="d-flex justify-content-center mb-4">
                <p className={styles.outerRing}>
                  <span className={styles.innerRing}>
                    <i style={{ color: "#2e58ff" }} className="fas fa-key" />
                  </span>
                </p>
              </div>
              <h2 className="mb-4">Crea una nueva contraseña</h2>
              <NewPassword
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
                disabled={!isValid}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Confirm;
