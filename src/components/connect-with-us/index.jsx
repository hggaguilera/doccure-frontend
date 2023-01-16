import React from "react";
import PatientRecord from "../../assets/images/feature1.png";
import Dentist from "../../assets/images/feature2.png";
import DoctorWithNurse from "../../assets/images/feature4.png";

import "./index.css";

function ConnectWithUs() {
  return (
    <section id="connecting-with-us" className="feature-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="left">
              <h6>Conecta con Nosotros</h6>
              <h2>¡Estamos brindando una muy buena atención y seguridad!</h2>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="right">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi
                architecto beatae vitae dicta sunt explicabo, sed ut perspiciatis unde omnis iste
                natus error.
              </p>
              <a href="#appointment" className="btn-yellow">
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
        <div className="row feature-column">
          <div className="feature-box">
            <div className="inner-feature-box text-center">
              <div className="feature-icon">
                <img src={PatientRecord} alt="patient history record icon" />
              </div>
              <h4>
                Revise Sus <br />
                Registros Médicos
              </h4>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem error.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="inner-feature-box text-center">
              <div className="feature-icon">
                <img src={Dentist} alt="dentist icon" />
              </div>
              <h4>
                Chequeos Mensuales <br />
                Disponibles
              </h4>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem error.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="inner-feature-box text-center">
              <div className="feature-icon">
                <img src={DoctorWithNurse} alt="doctor with nurse behind" />
              </div>
              <h4>
                Doctores Bien
                <br />
                Calificados
              </h4>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem error.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectWithUs;
