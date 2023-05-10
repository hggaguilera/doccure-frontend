import React, { useEffect, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/input";
import TextField from "@/components/text-field";
import { specialtySchema } from "@/libs/schemas";
import { buildSpecialtyUpdatePayload } from "@/libs/helpers";
import {
  useGetSpecialtyByIdQuery,
  useAddSpecialtyMutation,
  useUpdateSpecialtyMutation,
} from "@/store/services";

function SpecialtyModal({ show, setShow, specialtyId, editMode }) {
  const initialState = { name: null, description: null };
  const [initialData, setInitialData] = useState(initialState);

  const { data } = useGetSpecialtyByIdQuery(specialtyId || skipToken);
  const [addSpecialty, { isLoading: loadingSpecialtyResponse }] = useAddSpecialtyMutation();
  const [updateSpecialty, { isLoading: loadingSpecialtyUpdateResponse }] =
    useUpdateSpecialtyMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(specialtySchema),
  });

  useEffect(() => {
    if (data) {
      setInitialData({ name: data.specialtyName, description: data.specialtyDescription });
    }
  }, [data]);

  useEffect(() => {
    reset(initialData);
  }, [reset, initialData]);

  const onSubmit = (values) => {
    if (editMode) {
      const payload = buildSpecialtyUpdatePayload(values);
      updateSpecialty({ id: specialtyId, body: payload })
        .unwrap()
        .then(() => {
          reset(initialState);
          setShow(false);
        })
        .catch((error) => console.log("rejected", error));
      return;
    }

    addSpecialty(values)
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
                    name="name"
                    label="Especialidad"
                    placeholder="Endodoncia"
                    type="text"
                    register={register}
                    error={errors?.name?.message}
                  />
                </div>
                <div className="col-12">
                  <TextField
                    name="description"
                    label="Descripcion"
                    placeholder="Endodoncia"
                    register={register}
                    error={errors?.description?.message}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || loadingSpecialtyResponse || loadingSpecialtyUpdateResponse}
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SpecialtyModal;
