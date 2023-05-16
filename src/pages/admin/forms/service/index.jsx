/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Select } from "antd";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/input";
import TextField from "@/components/text-field";
import { serviceSchema } from "@/libs/schemas";
import { specialtiesFormattedData } from "@/libs/helpers";
import {
  useGetServiceByIdQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useGetSpecialtiesQuery,
} from "@/store/services";

function ServiceModal({ show, setShow, serviceId, editMode }) {
  const initialState = {
    serviceName: null,
    serviceDescription: null,
    price: null,
    specialtyId: null,
  };
  const [initialData, setInitialData] = useState(initialState);

  const { data } = useGetServiceByIdQuery(serviceId || skipToken);
  const { data: specialties } = useGetSpecialtiesQuery();
  const [addService, { isLoading: loadingServiceResponse }] = useAddServiceMutation();
  const [updateService, { isLoading: loadingServiceUpdateResponse }] = useUpdateServiceMutation();

  const formattedData = specialtiesFormattedData(specialties);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(serviceSchema),
  });

  useEffect(() => {
    if (data) {
      setInitialData(data);
    }
  }, [data]);

  useEffect(() => {
    reset(initialData);
  }, [reset, initialData]);

  const onSubmit = (values) => {
    if (editMode) {
      if (initialData.specialtyId !== values.specialtyId) {
        values.oldSpecialtyId = initialData.specialtyId;
      }

      updateService({ id: serviceId, body: values })
        .unwrap()
        .then(() => {
          reset(initialState);
          setShow(false);
        })
        .catch((error) => console.log("rejected", error));
      return;
    }

    addService(values)
      .unwrap()
      .then(() => {
        reset(initialState);
        setShow(false);
      })
      .catch((error) => console.log("rejected", error));
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
                  <Input
                    name="serviceName"
                    label="Servicio"
                    placeholder="Ortodoncia"
                    type="text"
                    register={register}
                    error={errors?.serviceName?.message}
                  />
                </div>
                <div className="col-12">
                  <TextField
                    name="serviceDescription"
                    label="Descripcion"
                    placeholder="Random"
                    register={register}
                    error={errors?.serviceDescription?.message}
                  />
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="specialtyId">Especialidad del Servicio</label>
                    <Controller
                      name="specialtyId"
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
                            options={formattedData}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <Input
                    name="price"
                    label="Precio"
                    placeholder="e.g. 100"
                    type="number"
                    register={register}
                    error={errors?.price?.message}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || loadingServiceResponse || loadingServiceUpdateResponse}
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ServiceModal;
