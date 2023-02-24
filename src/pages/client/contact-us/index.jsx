import React from "react";
import { Link } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import FeatherIcon from "feather-icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Layout from "../../../components/layout/client";
import ContactForm from "../../../components/forms/contact";

// Validations
import { contactUsSchema } from "../../../libs/schemas";

import "./index.css";

function ContactUs() {
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const userId = import.meta.env.VITE_PUBLIC_KEY;
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  const resetForm = () => {
    reset();
    clearErrors();
  };

  const onSubmit = (data) => {
    emailjs.send(serviceId, templateId, data, userId).then(
      () => {
        toast.success("Tu mensaje a sido enviado con éxito");
        resetForm();
      },
      () => {
        toast.error("Ha ocurrido un error al momento de enviar su mensaje, intentelo nuevamente");
      },
    );
  };

  return (
    <Layout>
      <div className="content-page">
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Inicio</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Contáctanos
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Contáctanos</h2>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-12 text-center">
                <h3 className="mb-4">Contáctanos</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 d-flex">
                <div className="contact-box flex-fill">
                  <div className="infor-img">
                    <div className="image-circle">
                      <FeatherIcon icon="phone" />
                    </div>
                  </div>
                  <div className="infor-details text-center">
                    <p className="label">Número de Teléfono</p>
                    <p>
                      <a href="tel:+50522222222">2222-2222</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="contact-box flex-fill">
                  <div className="infor-img">
                    <div className="image-circle bg-primary">
                      <FeatherIcon icon="mail" />
                    </div>
                  </div>
                  <div className="infor-details text-center">
                    <p className="label">Email</p>
                    <p>
                      <a href="mailto:contacto@msdental.com">contacto@msdental.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex">
                <div className="contact-box flex-fill">
                  <div className="infor-img">
                    <div className="image-circle">
                      <FeatherIcon icon="map-pin" />
                    </div>
                  </div>
                  <div className="infor-details text-center">
                    <p className="label">Ubicación</p>
                    <p>Costado Oeste de La Virgen del Camino, Salida de Chinandega</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-form">
          <div className="container">
            <div className="section-header text-center">
              <h2>¡Ponerse en Contacto!</h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ContactForm
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  errors={errors}
                  disabled={!isValid}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="contact-map d-flex">
          <Map
            mapboxAccessToken={accessToken}
            mapStyle="mapbox://styles/hggonzalez/cldub1m9c000p01l5ezpgrrh7"
            initialViewState={{
              longitude: -87.14879139251715,
              latitude: 12.64470936320111,
              zoom: 17,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Marker latitude={12.64470936320111} longitude={-87.14879139251715}>
              <div className="marker-label">
                <img src="src/assets/images/marker.svg" alt="marker" />
                <p>MS Dental</p>
              </div>
            </Marker>
          </Map>
        </section>
      </div>
    </Layout>
  );
}

export default ContactUs;
