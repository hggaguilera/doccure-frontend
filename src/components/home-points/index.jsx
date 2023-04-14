import React from "react";

function HomePoints() {
  return (
    <section className="top-service-col">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 text-center">
            <div className="service-box">
              <div className="card">
                <div className="card-body">
                  <div className="service-icon">
                    <img src="" alt="cosmetic dentistry" />
                  </div>
                  <h3>Blanqueamiento Dental</h3>
                  <p>
                    Nuestro tratamiento de blanqueamiento dental utiliza los mejores productos
                    disponibles en el mercado y la tecnología más avanzada para garantizar que tus
                    dientes se vean más blancos y brillantes que nunca.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 text-center">
            <div className="service-box">
              <div className="card">
                <div className="card-body">
                  <div className="service-icon">
                    <img src="" alt="quick examination" />
                  </div>
                  <h3>Implantes Dentales</h3>
                  <p>
                    Los implantes dentales son una excelente solución para reemplazar uno o varios
                    dientes perdidos. En nuestra clínica dental, ofrecemos implantes dentales de
                    alta calidad que son seguros y duraderos.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 text-center">
            <div className="service-box">
              <div className="card">
                <div className="card-body">
                  <div className="service-icon">
                    <img src="" alt="best care" />
                  </div>
                  <h3>Ortodoncia</h3>
                  <p>
                    En nuestra clínica dental, ofrecemos una variedad de opciones de ortodoncia,
                    incluyendo brackets tradicionales y alineadores transparentes. Nos aseguramos de
                    que tus dientes queden bien alineados para que puedas sonreír con confianza.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePoints;
