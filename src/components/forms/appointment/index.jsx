/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Controller } from "react-hook-form";
import IntlTelInput from "react-intl-tel-input";
import { DatePicker, Select } from "antd";
import Input from "./input";

import "./index.css";

function AppointmentForm({ register, control, handleSubmit, onSubmit, errors }) {
  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="form-group">
          <Input
            name="patientName"
            label="Nombre"
            type="text"
            register={register}
            error={errors?.patientName?.message}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="form-group">
          <Input
            name="email"
            label="Email"
            type="email"
            register={register}
            error={errors?.email?.message}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="form-group">
          <label htmlFor="phoneNumber">Numero de Telefono</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => {
              return (
                <>
                  <IntlTelInput
                    containerClassName={
                      error?.message ? "intl-tel-input input-error" : "intl-tel-input"
                    }
                    fieldId="phoneNumber"
                    fieldName="phoneNumber"
                    preferredCountries={["bz", "gt", "sv", "hn", "ni", "cr", "pa"]}
                    defaultCountry="ni"
                    inputClassName="phone-number"
                    onPhoneNumberChange={(...args) => onChange(args[3].replace(/\s|-/g, ""))}
                    format
                  />
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="form-group">
          <label htmlFor="doctorName">Doctor</label>
          <Controller
            name="doctorName"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <Select
                    {...field}
                    className={error?.message ? "input-error" : ""}
                    showSearch
                    placeholder="Seleccione un Doctor"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={[{ value: "some", label: "Mariam" }]}
                  />
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="form-group mb-0">
          <label htmlFor="date">Fecha</label>
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <DatePicker {...field} className={error?.message ? "input-error" : ""} />
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <button type="submit" className="btn-yellow">
          Agendar Cita
        </button>
      </div>
    </form>
  );
}

export default AppointmentForm;
