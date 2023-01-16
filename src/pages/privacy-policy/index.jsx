import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/client";

import "./index.css";

function PrivacyPolicy() {
  return (
    <Layout>
      <div className="main-wrapper">
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
                      Politicas de Privacidad
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Politicas de Privacidad</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">Politica de Protección de Datos Personales</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ul className="policy-list">
                  <li>
                    Recolección de información: La clínica recolecta información personal de los
                    pacientes, como nombre, dirección, número de teléfono, historial médico y
                    dentales, y información de seguros médicos. Esta información se recolecta a
                    través de formularios de registro, citas, historiales médicos y otros medios.
                  </li>
                  <li>
                    Uso de la información: La clínica utiliza la información personal de los
                    pacientes para brindar servicios dentales, facturar, comunicarse con los
                    pacientes sobre citas y tratamientos, y cumplir con las regulaciones legales y
                    de seguros. La clínica también puede utilizar la información para fines de
                    investigación y estadísticas, siempre y cuando se haya obtenido el
                    consentimiento del paciente.
                  </li>
                  <li>
                    Compartir información: La clínica solo compartirá la información personal de los
                    pacientes con terceros autorizados, como seguros médicos, autoridades
                    reguladoras, y en caso de emergencia médica. La clínica también puede compartir
                    información con otras clínicas y profesionales médicos para brindar un mejor
                    servicio al paciente.
                  </li>
                  <li>
                    Protección de la información: La clínica toma medidas de seguridad para proteger
                    la información personal de los pacientes, incluyendo la encriptación de datos,
                    el control de acceso, y la implementación de políticas y procedimientos de
                    seguridad.
                  </li>
                  <li>
                    Acceso a la información: Los pacientes tienen derecho a acceder y corregir su
                    información personal. La clínica proporcionará información personal solicitada
                    en un plazo razonable y de acuerdo a las regulaciones legales.
                  </li>
                  <li>
                    Cambios en las políticas: La clínica se reserva el derecho de cambiar estas
                    políticas de privacidad en cualquier momento. Si se realizan cambios
                    significativos, se informará a los pacientes mediante un aviso en el sitio web
                    de la clínica o mediante una comunicación directa.
                  </li>
                  <li>
                    Contacto: Si tiene preguntas o inquietudes sobre las políticas de privacidad de
                    la clínica, por favor contáctenos a través del correo electrónico o teléfono
                    proporcionados
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PrivacyPolicy;
