/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
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
import Input from "@/components/forms/new-patient/input";

// Helpers
import { patientSchema } from "@/libs/schemas";
import { useGetCountriesQuery, useGetPatientByIdQuery } from "@/store/services";
import { patientInitialValues } from "@/libs/init-state";

const contactType = [
  {
    value: "yes",
    label: "Primario",
  },
  {
    value: "no",
    label: "Secundario",
  },
];

const numberType = [
  {
    value: "mobile",
    label: "Movil",
  },
  {
    value: "home",
    label: "Casa",
  },
  {
    value: "work",
    label: "Trabajo",
  },
  {
    value: "other",
    label: "Otro",
  },
];

function Patient({ editMode = false }) {
  const [initialData, setInitialData] = useState();
  const { patientId } = useParams();
  const { data: countries, isLoading: isLoadingCountriesList } = useGetCountriesQuery();
  const { data: patientData } = useGetPatientByIdQuery(patientId || skipToken);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema),
  });

  useEffect(() => {
    const settingInitialValue = () => {
      if (patientData) {
        return setInitialData(patientData);
      }

      const data = patientInitialValues(countries);
      return setInitialData(data);
    };

    settingInitialValue();
  }, [countries, patientData]);

  useEffect(() => {
    if (!initialData?.address) {
      const nic = isLoadingCountriesList
        ? "Nicaragua"
        : countries.find((item) => item.label === "Nicaragua");
      setInitialData({ ...initialData, address: { countryId: nic.value } });
    }
    reset(initialData);
  }, [reset, setValue, initialData, countries, isLoadingCountriesList]);

  const disabledDate = (current) => {
    return current && current.year() > dayjs().year() - 3;
  };

  const defaultCountry =
    isLoadingCountriesList || !initialData?.address
      ? "ni"
      : countries.find((item) => item.value === initialData?.address.countryId);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Layout
      pageTitle="Pacientes"
      mainPage="Dashboard"
      mainPageUrl="/admin"
      currentPage="Nuevo Paciente"
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
                  placeholder="John"
                  type="text"
                  readOnly={editMode}
                  register={register}
                  error={errors?.firstName?.message}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
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
              <div className="col-12 col-md-6 col-lg-4">
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
              <div className="col-12 col-md-6 col-lg-4">
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
                          inputReadOnly={editMode}
                          disabledDate={disabledDate}
                          defaultPickerValue={dayjs("01/01/2020")}
                          value={field.value ? dayjs(field?.value) : null}
                          locale={locale}
                          format="D [de] MMMM [de] YYYY"
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Input
                  name="email"
                  label="Correo"
                  placeholder="john.doe@mail.com"
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
                          options={contactType}
                          defaultValue="yes"
                          disabled={editMode}
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
                      return <Select {...field} options={numberType} defaultValue="mobile" />;
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4">
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
                          defaultCountry={
                            isLoadingCountriesList || !initialData?.address
                              ? "ni"
                              : defaultCountry?.country_abbr.toLowerCase()
                          }
                          value={value?.phoneNumber || ""}
                          inputClassName="phone-number"
                          onPhoneNumberChange={(_, fullNumber, countryData) =>
                            onChange({
                              countryCode: countryData.dialCode,
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
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                          }
                          options={countries}
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
                  placeholder="Ave. Las Palmas"
                  type="text"
                  register={register}
                  error={errors?.address?.addressLineOne?.message}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Input
                  name="address.addressLineTwo"
                  label="Direccion Complementaria"
                  placeholder="3A Poniente Norte 3"
                  type="text"
                  register={register}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Input
                  name="address.townOrMunicipality"
                  label="Provincia/Municipio"
                  placeholder="Chinandega"
                  type="text"
                  register={register}
                  error={errors?.address?.townOrMunicipality?.message}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Input
                  name="address.stateOrCity"
                  label="Ciudad/Estado"
                  placeholder="Chinandega"
                  type="text"
                  register={register}
                  error={errors?.address?.stateOrCity?.message}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Input
                  name="address.zipCode"
                  label="Codigo Postal"
                  placeholder="21100"
                  type="text"
                  register={register}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Patient;
