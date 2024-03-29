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
import { patientSchema } from "@/libs/schemas";
import {
  useAddPatientMutation,
  useGetCountriesQuery,
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from "@/store/services";
import { baseCountryData, patientInitialValues } from "@/libs/init-state";

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
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [initialData, setInitialData] = useState();
  const [defaultCountry, setDefaultCountry] = useState();
  const { data: patient, isLoading } = useGetPatientByIdQuery(patientId || skipToken);
  const { data: countries, isLoading: isLoadingCountriesList } = useGetCountriesQuery();
  const [addPatient, { isLoading: isSavingPatient }] = useAddPatientMutation();
  const [updatePatient, { isLoading: isUpdatingPatient }] = useUpdatePatientMutation();

  useEffect(() => {
    const setInitialValues = () => {
      if (editMode && !isLoading) {
        const data = { ...patient };

        if (!patient?.address) {
          data.address = { countryId: baseCountryData.value };
        }
        setInitialData(data);

        if (!isLoadingCountriesList) {
          const country = countries.find((item) => item.value === data.address.countryId);
          setDefaultCountry(country);
        }
        return;
      }

      if (!isLoadingCountriesList) {
        const initialState = patientInitialValues();
        setInitialData(initialState);
        const country = countries.find((item) => item.value === initialState.address.countryId);
        setDefaultCountry(country);
      }
    };

    setInitialValues();
  }, [editMode, isLoading, patient, isLoadingCountriesList, countries]);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(patientSchema),
  });

  useEffect(() => {
    reset(initialData);
  }, [reset, initialData]);

  const disabledDate = (current) => {
    return current && current.year() > dayjs().year() - 3;
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
      updatePatient({
        id: patientId,
        body: { ...values, dateOfBirth: formatDate(values.dateOfBirth) },
      })
        .unwrap()
        .then(() => navigate("/admin/patients"))
        .catch((error) => console.log("rejected", error));
      return;
    }
    addPatient({ ...values, dateOfBirth: formatDate(values.dateOfBirth) })
      .unwrap()
      .then(() => navigate("/admin/patients"))
      .catch((error) => console.log("rejected", error));
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
                          disabled={editMode}
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
                          defaultCountry={defaultCountry?.country_abbr.toLowerCase()}
                          value={value?.phoneNumber || ""}
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || isSavingPatient || isUpdatingPatient}
          >
            Guardar
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Patient;
