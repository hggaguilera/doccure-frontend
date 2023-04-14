import React from "react";

import "./index.css";

function Banner() {
  return (
    <section className="section section-search">
      <div className="container">
        <div className="banner-wrapper">
          <div className="banner-header">
            <h6>Trabajamos para encargarnos de tu sonrisa</h6>
            <h1>¡Gran sonrisa para un estilo de vida saludable!</h1>
            <p>
              En nuestra clínica dental, nos enorgullecemos de ofrecer servicios de alta calidad a
              nuestros pacientes. Nuestro equipo de profesionales altamente capacitados y
              experimentados está dedicado a proporcionar el mejor cuidado dental posible.
            </p>
            <a href="#appointment" className="btn-yellow">
              Agendar Cita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
