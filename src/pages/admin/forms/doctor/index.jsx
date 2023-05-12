/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, Select } from "antd";
import IntlTelInput from "react-intl-tel-input";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/es_ES";

// Locale
import "dayjs/locale/es";

// Custom Components
import Layout from "@/components/layout/admin";
import Input from "@/components/input";

// Helpers
import { doctorSchema } from "@/libs/schemas";
import {
  useAddDoctorMutation,
  useGetDoctorByIdQuery,
  useGetSpecialtiesQuery,
  useUpdateDoctorMutation,
} from "@/store/services";
import { doctorInitialValues } from "@/libs/init-state";
import { specialtiesFormattedData } from "@/libs/helpers";

const adminType = [
  {
    value: true,
    label: "Administrador",
  },
  {
    value: false,
    label: "Temporal",
  },
];

function Doctor({ editMode = false }) {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [initialData, setInitialData] = useState();
  const { data: doctor, isLoading } = useGetDoctorByIdQuery(doctorId || skipToken);
  const { data: specialties } = useGetSpecialtiesQuery();
  const [addDoctor, { isLoading: isSavingDoctor }] = useAddDoctorMutation();
  const [updateDoctor, { isLoading: isUpdatingDoctor }] = useUpdateDoctorMutation();

  const formattedData = specialtiesFormattedData(specialties);

  useEffect(() => {
    const setInitialValues = () => {
      if (editMode && !isLoading) {
        setInitialData(doctor);
        return;
      }

      const initialState = doctorInitialValues();
      setInitialData(initialState);
    };

    setInitialValues();
  }, [editMode, isLoading, doctor]);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(doctorSchema),
  });

  useEffect(() => {
    reset(initialData);
  }, [reset, initialData]);

  const disabledDate = (current) => {
    return current && current.year() > dayjs().year() - 22;
  };

  const formatDate = (date) => {
    return dayjs(date)
      .set("hour", 13)
      .set("minutes", 0)
      .set("seconds", 0)
      .format("YYYY-MM-DD HH:mm:ss Z");
  };

  const onSubmit = (values) => {
    if (editMode) {
      updateDoctor({
        id: doctorId,
        body: { ...values, dateOfBirth: formatDate(values.dateOfBirth) },
      })
        .unwrap()
        .then(() => navigate("/admin/doctors"))
        .catch((error) => console.log("rejected", error));
      return;
    }
    addDoctor({ ...values, dateOfBirth: formatDate(values.dateOfBirth) })
      .unwrap()
      .then(() => navigate("/admin/doctors"))
      .catch((error) => console.log("rejected", error));
  };

  return (
    <Layout
      pageTitle="Doctores"
      mainPage="Dashboard"
      mainPageUrl="/admin"
      currentPage="Nuevo Doctor"
    >
      {Object.keys(errors).length ? (
        <Alert variant="danger" dismissible>
          <Alert.Heading>¡Tienes un error!</Alert.Heading>
          <p>Los campos en rojo son requeridos, por favor completalos para poder continuar.</p>
        </Alert>
      ) : null}

      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12">
          <div className="section-group">
            <div className="card-header">
              <div className="row">
                <div className="col-auto col-sm-7">
                  <h5 className="headline">Informacion</h5>
                  <h6 className="sub-title">Datos Personales</h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="firstName"
                  label="Primer Nombre"
                  placeholder="John"
                  type="text"
                  readOnly={editMode}
                  register={register}
                  error={errors?.firstName?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="middleName"
                  label="Segundo Nombre"
                  placeholder="Ibrahim"
                  type="text"
                  readOnly={!!getValues("middleName") && editMode}
                  register={register}
                  error={errors?.middleName?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="lastName"
                  label="Apellido"
                  placeholder="Doe"
                  type="text"
                  readOnly={editMode}
                  register={register}
                  error={errors?.lastName?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className={errors?.dateOfBirth?.message ? "form-group error" : "form-group"}>
                  <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <DatePicker
                          {...field}
                          className={error?.message ? "input-error" : ""}
                          showToday={false}
                          showNow={false}
                          showTime={false}
                          disabled={!!getValues("middleName") && editMode}
                          disabledDate={disabledDate}
                          defaultPickerValue={dayjs("01/01/2001")}
                          value={field.value ? dayjs(field?.value) : null}
                          locale={locale}
                          format="D [de] MMMM [de] YYYY"
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="card-header">
              <div className="row">
                <div className="col-auto col-sm-7">
                  <h6 className="sub-title">Contacto</h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="email"
                  label="Correo"
                  placeholder="john.doe@mail.com"
                  type="email"
                  register={register}
                  error={errors?.email?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className={
                    errors?.phone?.phoneNumber?.message ? "form-group error" : "form-group"
                  }
                >
                  <label htmlFor="phone">Numero Telefónico</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <IntlTelInput
                          containerClassName="intl-tel-input"
                          fieldId="phone"
                          fieldName="phone"
                          placeholder="ej. 86433047"
                          preferredCountries={["bz", "gt", "sv", "hn", "ni", "cr", "pa"]}
                          defaultCountry="ni"
                          value={value?.phoneNumber}
                          inputClassName="phone-number"
                          onPhoneNumberChange={(_, fullNumber, countryData) =>
                            onChange({
                              countryCode: `+${countryData.dialCode}`,
                              phoneNumber: fullNumber,
                            })
                          }
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="card-header">
              <div className="row">
                <div className="col-auto col-sm-7">
                  <h6 className="sub-title">Direccion</h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="address.addressLineOne"
                  label="Direccion"
                  placeholder="Ave. Las Palmas"
                  type="text"
                  register={register}
                  error={errors?.address?.addressLineOne?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="address.addressLineTwo"
                  label="Direccion Complementaria"
                  placeholder="3A Poniente Norte 3"
                  type="text"
                  register={register}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="address.townOrMunicipality"
                  label="Provincia/Municipio"
                  placeholder="Chinandega"
                  type="text"
                  register={register}
                  error={errors?.address?.townOrMunicipality?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="address.stateOrCity"
                  label="Ciudad/Estado"
                  placeholder="Chinandega"
                  type="text"
                  register={register}
                  error={errors?.address?.stateOrCity?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="address.zipCode"
                  label="Codigo Postal"
                  placeholder="21100"
                  type="text"
                  register={register}
                />
              </div>
            </div>
            <div className="card-header">
              <div className="row">
                <div className="col-auto col-sm-7">
                  <h6 className="sub-title">Otros Datos</h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Input
                  name="prefix"
                  label="Prefijo"
                  placeholder="DMD"
                  type="text"
                  readOnly={editMode}
                  register={register}
                  error={errors?.prefix?.message}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="form-group">
                  <label htmlFor="isSystemUser">Tipo de Usuario</label>
                  <Controller
                    name="isSystemUser"
                    control={control}
                    render={({ field }) => {
                      return <Select {...field} options={adminType} defaultValue />;
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="form-group">
                  <label htmlFor="specialties">Especialidades</label>
                  <Controller
                    name="specialties"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          mode="multiple"
                          allowClear
                          showSearch
                          options={formattedData}
                          placeholder="Seleccione las Especialidades"
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || isSavingDoctor || isUpdatingDoctor}
          >
            Guardar
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Doctor;
