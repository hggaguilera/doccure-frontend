/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import IntlTelInput from "react-intl-tel-input";
import { DatePicker, Select, TimePicker } from "antd";
import dayjs from "dayjs";

// Locale
import locale from "antd/es/date-picker/locale/es_ES";
import "dayjs/locale/es";

// Custom Components
import Input from "./input";

import "./index.css";

const { Option, OptGroup } = Select;

function AppointmentForm({
  doctors,
  specialties,
  appointments,
  doctor,
  selectDoctor,
  register,
  control,
  handleSubmit,
  onSubmit,
  errors,
  disabled,
}) {
  const [disabledHours, setDisabledHours] = useState([]);

  const range = (start, end) => {
    const result = [];
    // eslint-disable-next-line no-plusplus
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledTime = () => {
    return {
      disabledHours: () => [...range(0, 8), ...range(17, 24), ...disabledHours],
    };
  };

  const disabledDate = (current) => {
    const currentDate = dayjs();
    const currentHour = currentDate.hour();

    if (dayjs().add(-1, "days") >= current) {
      return true;
    }
    if (current && current.isSame(currentDate, "day") && currentHour >= 17) {
      return true;
    }
    return false;
  };

  const handleDisabledHoursOnSelect = (date) => {
    const selectedDate = dayjs(date).toString();
    const hours = doctor
      ? appointments
          .filter(
            (appt) => appt.doctor === doctor.label && dayjs(selectedDate).isSame(appt.date, "day"),
          )
          .map((rec) => {
            const formattedDate = new Date(rec.date).toLocaleString();
            return dayjs(formattedDate).get("hour");
          })
      : [];
    setDisabledHours(hours);
  };

  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="form-group">
          <Input
            name="patientName"
            label="Nombre"
            type="text"
            register={register}
            placeholder="Escriba su nombre"
            tooltip="Escriba un nombre y un apellido"
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
            placeholder="ej. jane.doe@mail.com"
            register={register}
            error={errors?.email?.message}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="form-group">
          <label htmlFor="phone">Numero de Telefono</label>
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
                      onChange({ dialCode: countryData.dialCode, phoneNumber: fullNumber })
                    }
                  />
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
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
                    onChange={(val, opt) => {
                      field.onChange(val);
                      selectDoctor({ id: opt.value, label: opt.label });
                    }}
                    placeholder="Seleccione un Doctor"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={doctors}
                  />
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="form-group mb-0">
          <label htmlFor="service">Servicio</label>
          <Controller
            name="service"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <Select
                    {...field}
                    className={error?.message ? "input-error" : ""}
                    showSearch
                    placeholder="Seleccione el Servicio que Desea"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {specialties?.map((specialty) => (
                      <OptGroup key={specialty.id} label={specialty.specialtyName}>
                        {specialty.services?.map((service) => (
                          <Option key={service.id} value={service.id}>
                            {service.name}
                          </Option>
                        ))}
                      </OptGroup>
                    ))}
                  </Select>
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="form-group mb-0">
          <label htmlFor="date">Fecha</label>
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <DatePicker
                    {...field}
                    className={error?.message ? "input-error" : ""}
                    placeholder="Elija la Fecha"
                    showToday={false}
                    showNow={false}
                    showTime={false}
                    onChange={(val) => {
                      field.onChange(val);
                      handleDisabledHoursOnSelect(val);
                    }}
                    disabledDate={disabledDate}
                    locale={locale}
                    format="ddd, D [de] MMMM"
                  />
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-3">
        <div className="form-group mb-0">
          <label htmlFor="time">Hora</label>
          <Controller
            name="time"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <TimePicker
                    {...field}
                    className={error?.message ? "input-error" : ""}
                    placeholder="Elija la Hora"
                    showNow={false}
                    showMinute={false}
                    minuteStep={60}
                    hideDisabledOptions
                    disabledTime={disabledTime}
                    locale={locale}
                    format="hh:mm A"
                  />
                  {error?.message && <p className="invalid">{error.message}</p>}
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-4 offset-lg-4">
        <button type="submit" className="btn-yellow" disabled={disabled}>
          Agendar Cita
        </button>
      </div>
    </form>
  );
}

export default AppointmentForm;
