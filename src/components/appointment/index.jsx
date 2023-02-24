import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppointmentForm from "../forms/appointment";
import { useAddAppointmentMutation } from "../../services/appointment";

// Validations
import { bookAppointmentSchema } from "../../libs/schemas";
import { buildAppointmentPayload, doctorsFormattedData } from "../../libs/helpers";

function Appointment({ doctors }) {
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(bookAppointmentSchema),
  });

  const formattedData = doctorsFormattedData(doctors);

  const onSubmit = (data) => {
    const payload = buildAppointmentPayload(data);
    addAppointment(payload).then((res) => {
      console.log(res.data);
      reset();
    });
    // console.log(payload);
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
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo, sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem accusantium.
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
                    data={formattedData}
                    register={register}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                    disabled={!isValid && isLoading}
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
