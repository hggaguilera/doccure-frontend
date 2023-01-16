import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppointmentForm from "../forms/appointment";

// Validations
import { bookAppointmentSchema } from "../../libs/schemas";

function Appointment() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookAppointmentSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <section className="appoinment-section">
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
                    register={register}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
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
