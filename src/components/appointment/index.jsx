import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import AppointmentForm from "../forms/appointment";

// Validations
import { bookAppointmentSchema } from "../../libs/schemas";
import { doctorsFormattedData } from "../../libs/helpers";

function Appointment({ doctors }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(bookAppointmentSchema),
  });

  const formattedData = doctorsFormattedData(doctors);

  const onSubmit = (data) => {
    const dt = {
      date: moment(data.date).format("MM-DD-YYYY"),
      time: moment(data.time, "HH:mm:ss"),
    };
    console.log(dt);
  };

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
                    data={formattedData}
                    register={register}
                    control={control}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    errors={errors}
                    disabled={!isValid}
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
