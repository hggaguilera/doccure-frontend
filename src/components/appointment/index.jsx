import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import AppointmentForm from "../forms/appointment";

// Queries
import {
  useAddAppointmentMutation,
  useGetAppointmentsDatesQuery,
} from "../../store/services/appointment";
import { useGetDoctorsBasicInfoQuery } from "../../store/services/doctor";
import { useGetServicesByCategoryQuery } from "../../store/services/service";

// Locale
import "dayjs/locale/es";

// Validations
import { bookAppointmentSchema } from "../../libs/schemas";
import { doctorsFormattedData, buildAppointmentPayload } from "../../libs/helpers";

function Appointment() {
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();
  const { data: doctors } = useGetDoctorsBasicInfoQuery();
  const { data: specialties } = useGetServicesByCategoryQuery();
  const { data: appointments } = useGetAppointmentsDatesQuery();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(bookAppointmentSchema),
  });

  const doctorsData = doctorsFormattedData(doctors);

  const filteredSpecialties = specialties?.filter((specialty) => {
    return specialty.doctors.includes(selectedDoctor?.id);
  });

  const onSubmit = (data) => {
    const payload = buildAppointmentPayload(data);
    addAppointment(payload).then((res) => {
      const { date, doctor, message } = res.data;
      if (message) {
        toast.warning("Ya existe una cita para este paciente en esa misma fecha");
        reset();
        return;
      }
      const formattedDate = dayjs(date).locale("es").format("ddd, D [de] MMMM [a las] hh:mm A");
      toast.success(
        `Su cita para el dia ${formattedDate} con el doctor ${doctor} ha sido agendada`,
      );
      reset();
    });
  };

  return (
    <>
      <section className="appointment-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12">
              <div className="section-header text-center">
                <h6>Citas</h6>
                <h2 className="text-white">Agenda un Cita</h2>
                <p className="text-white">
                  Nuestro equipo de profesionales altamente capacitados y experimentados está
                  dedicado a proporcionar el mejor cuidado dental posible. En nuestra clínica, nos
                  tomamos el tiempo para conocer a cada paciente y entender sus necesidades
                  individuales para brindarles un tratamiento personalizado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="appmt-form location-col">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <AppointmentForm
                    doctors={doctorsData}
                    specialties={filteredSpecialties}
                    appointments={appointments}
                    doctor={selectedDoctor}
                    selectDoctor={setSelectedDoctor}
                    register={register}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                    disabled={!isValid || isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;
