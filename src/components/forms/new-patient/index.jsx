/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker, Select } from "antd";
import IntlTelInput from "react-intl-tel-input";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/es_ES";

import Input from "./input";

import "dayjs/locale/es";

function NewPatientForm({ register, control, handleSubmit, onSubmit, errors, disabled }) {
  const disabledDate = (current) => {
    return current && current.year() > dayjs().year() - 3;
  };

  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12">
        <div className="section-group">
          <div className="card-header">
            <div className="row">
              <div className="col-auto col-sm-7">
                <h5 className="headline">Informacion Personal</h5>
                <h6 className="sub-title">Campos Requeridos</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="firstName"
                label="Primer Nombre"
                type="text"
                register={register}
                error={errors?.firstName?.message}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="middleName"
                label="Segundo Nombre"
                type="text"
                register={register}
                error={errors?.middleName?.message}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="lastName"
                label="Apellido"
                type="text"
                register={register}
                error={errors?.lastName?.message}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <>
                        <DatePicker
                          {...field}
                          className={error?.message ? "input-error" : ""}
                          showToday={false}
                          showNow={false}
                          showTime={false}
                          disabledDate={disabledDate}
                          defaultPickerValue={dayjs("01/01/2020")}
                          locale={locale}
                          format="D [de] MMMM [de] YYYY"
                        />
                        {error?.message && <p className="invalid">{error.message}</p>}
                      </>
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="email"
                label="Correo"
                type="email"
                register={register}
                error={errors?.email?.message}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="section-group">
          <div className="card-header">
            <div className="row">
              <div className="col-auto col-sm-7">
                <h5 className="headline">Informacion Secundaria</h5>
                <h6 className="sub-title">Numeros de Teléfono</h6>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-4">
              <div className="form-group">
                <label htmlFor="phone.isPrimary">Tipo de Contacto</label>
                <Controller
                  name="phone.isPrimary"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="form-group">
                <label htmlFor="phone.type">Tipo de Número de Teléfono</label>
                <Controller
                  name="phone.type"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="form-group">
                <label htmlFor="phone">Numero Telefónico</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                      <>
                        <IntlTelInput
                          containerClassName={
                            error?.message ? "intl-tel-input input-error" : "intl-tel-input"
                          }
                          fieldId="phone"
                          fieldName="phone"
                          placeholder="ej. 86433047"
                          preferredCountries={["bz", "gt", "sv", "hn", "ni", "cr", "pa"]}
                          defaultCountry="ni"
                          value={value?.phoneNumber || ""}
                          inputClassName="phone-number"
                          onPhoneNumberChange={(_, fullNumber, countryData) =>
                            onChange({
                              countryCode: countryData.dialCode,
                              phoneNumber: fullNumber,
                            })
                          }
                        />
                        {error?.message && <p className="invalid">{error.message}</p>}
                      </>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="card-header">
            <div className="row">
              <div className="col-auto col-sm-7">
                <h6 className="sub-title">Direcciones</h6>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="address.countryId">Pais</label>
                <Controller
                  name="address.countryId"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="address.addressLineOne"
                label="Direccion"
                type="text"
                register={register}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="address.addressLineTwo"
                label="Direccion Complementaria"
                type="text"
                register={register}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="address.stateOrCity"
                label="Ciudad/Estado"
                type="text"
                register={register}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input
                name="address.townOrMunicipality"
                label="Provincia/Municipio"
                type="text"
                register={register}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <Input name="address.zipCode" label="Codigo Postal" type="text" register={register} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-outline-primary" disabled={disabled}>
          Guardar
        </button>
      </div>
    </form>
  );
}

export default NewPatientForm;
