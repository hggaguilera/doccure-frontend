/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Select, DatePicker } from "antd";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/es_ES";
import TextField from "@/components/text-field";
import { useGetAppointmentByIdQuery, useGetServicesQuery } from "@/store/services";
import { invoiceSchema } from "@/libs/schemas";

// Locale
import "dayjs/locale/es";
import styles from "./styles.module.css";

function InvoiceModal({ show, setShow, appointmentId }) {
  const initialState = {
    summary: "",
    date: "",
    tax: "",
    personId: "",
    appointmentId: "",
    items: [],
    completeTotal: "",
  };

  const [initialData, setInitialData] = useState(initialState);
  const [options, setOptions] = useState([]);
  const { data: appointment } = useGetAppointmentByIdQuery(appointmentId || skipToken);
  const { data: services } = useGetServicesQuery();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
  });

  const subscription = watch("items");

  const total = (quantity, price) => {
    return +quantity * +price;
  };

  useEffect(() => {
    if (appointment) {
      setInitialData({
        personId: appointment.patientId,
        appointmentId: appointment.id,
        summary: "",
        date: "",
        tax: "",
        items: [
          {
            service: appointment.service,
            price: appointment.servicePrice,
            quantity: 1,
            total: 1 * +appointment.servicePrice,
          },
        ],
        completeTotal: "",
      });
    }
  }, [appointment]);

  useEffect(() => {
    if (services) {
      setOptions(
        services.map((service) => ({ label: service.serviceName, value: service.serviceName })),
      );
    }
  }, [services]);

  useEffect(() => {
    reset(initialData);
  }, [reset, initialData]);

  useEffect(() => {
    if (subscription?.length) {
      const overallTotal = subscription.reduce((sum, item) => sum + item.total, 0);
      const tax = overallTotal * 0.15;
      const totalWithTax = overallTotal + tax;

      setValue("tax", tax);
      setValue("completeTotal", totalWithTax);
    }
  }, [setValue, subscription]);

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const { fields, append } = useFieldArray({ control, name: "items" });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        reset(initialState);
        setShow(false);
      }}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar una Nueva Especialidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(errors).length ? (
          <Alert variant="danger" dismissible>
            <Alert.Heading>¡Tienes un error!</Alert.Heading>
            <p>Los campos en rojo son requeridos, por favor completalos para poder continuar.</p>
          </Alert>
        ) : null}

        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12">
            <div className="section-group">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="doctorName">Doctor</label>
                    <input
                      id="doctorName"
                      type="text"
                      placeholder="John Doe"
                      className="form-control"
                      readOnly
                      value={appointment?.doctor}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="patientName">Paciente</label>
                    <input
                      id="patientName"
                      type="text"
                      placeholder="John Doe"
                      className="form-control"
                      readOnly
                      value={appointment?.patient}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className={errors?.date?.message ? "form-group error" : "form-group"}>
                    <label htmlFor="date">Fecha de la Factura</label>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field, fieldState: { error } }) => {
                        return (
                          <DatePicker
                            {...field}
                            className={error?.message ? "input-error" : ""}
                            showToday={false}
                            showNow={false}
                            showTime={false}
                            disabledDate={disabledDate}
                            locale={locale}
                            format="D [de] MMMM [de] YYYY"
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-2">Servicio</p>
                    </div>
                    <div className="col-2">
                      <p className="mb-2">Ctd</p>
                    </div>
                    <div className="col-2">
                      <p className="mb-2">Precio</p>
                    </div>
                    <div className="col-2">
                      <p className="mb-2">Total</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <button
                        type="button"
                        className={`btn btn-link ${styles.btnCustom}`}
                        onClick={() =>
                          append({
                            service: "Examen Dental Completo",
                            price: 50,
                            quantity: 1,
                            total: 50,
                          })
                        }
                      >
                        + Agregar Servicio
                      </button>
                    </div>
                    <div className="col-2">
                      <p className={styles.total}>Impuestos: </p>
                    </div>
                    <div className="col-2">
                      <Controller
                        name="tax"
                        control={control}
                        render={({ field }) => {
                          return (
                            <input
                              {...field}
                              className={`form-control ${styles.customReadOnlyControls}`}
                              readOnly
                              type="number"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 offset-8">
                      <p className={styles.total}>
                        <b>Total:</b>
                      </p>
                    </div>
                    <div className="col-2">
                      <Controller
                        name="completeTotal"
                        control={control}
                        render={({ field }) => {
                          return (
                            <input
                              {...field}
                              className={`form-control ${styles.customReadOnlyControls}`}
                              readOnly
                              type="number"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <TextField name="summary" label="Notas Adicionales" register={register} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary float-end">
              Enviar Factura
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default InvoiceModal;
