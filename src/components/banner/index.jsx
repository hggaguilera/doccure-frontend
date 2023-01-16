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
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo
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
