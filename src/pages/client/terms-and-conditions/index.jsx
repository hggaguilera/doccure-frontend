import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/layout/client";

import "./index.css";

function TermsAndConditions() {
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
                      Terminos y Condiciones
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Terminos y Condiciones</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">
                  Al utilizar este sitio web, se considera que ha leído y aceptado los siguientes
                  términos y condiciones
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ul className="terms-list">
                  <li>
                    Servicios: La clínica ofrece una variedad de servicios dentales, incluyendo
                    limpieza dental, tratamiento de caries, endodoncia, prótesis y cirugía.
                  </li>
                  <li>
                    Costos y pagos: Los costos de los servicios varían según el tratamiento
                    requerido. Los pacientes deben pagar por los servicios en el momento del
                    tratamiento. Se aceptan tarjetas de crédito y débito, cheques y efectivo.
                  </li>
                  <li>
                    Política de cancelaciones y reembolsos: Los pacientes deben cancelar o
                    reprogramar las citas con al menos 24 horas de antelación. Si no se cancela con
                    la debida antelación o si no se presenta a la cita, se cobrará una tarifa de
                    cancelación.
                  </li>
                  <li>
                    Política de privacidad: La clínica respeta la privacidad de los pacientes y se
                    compromete a proteger la información confidencial. Solo se compartirá la
                    información con las autoridades reguladoras o en caso de emergencia médica.
                  </li>
                  <li>
                    Responsabilidad del paciente: Los pacientes son responsables de proporcionar
                    información precisa y actualizada sobre su salud y estado dental. También son
                    responsables de seguir las instrucciones postoperatorias y de mantener las citas
                    de seguimiento.
                  </li>
                  <li>
                    Responsabilidad de la clínica: La clínica se compromete a proporcionar servicios
                    de alta calidad y a mantener un ambiente seguro y limpio. En caso de un error
                    médico, la clínica se responsabilizará de resolver el problema de manera rápida
                    y eficiente.
                  </li>
                  <li>
                    Política de emergencias: La clínica ofrece servicios de atención dental de
                    emergencia. En caso de una emergencia fuera del horario de oficina, se
                    proporcionará información para contactar a un dentista de guardia.
                  </li>
                  <li>
                    Servicio al cliente: La clínica ofrece un servicio al cliente excepcional y está
                    disponible para responder cualquier pregunta o inquietud que pueda tener el
                    paciente.
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

export default TermsAndConditions;
