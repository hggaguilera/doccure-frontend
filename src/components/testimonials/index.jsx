/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import Slider from "react-slick";

// Images
import PatientOne from "../../assets/images/patients/juan_tercero.jpg";
import PatientTwo from "../../assets/images/patients/daniela_quezada.jpg";
import PatientThree from "../../assets/images/patients/grace_rivera.jpg";

import "./index.css";

function Testimonials() {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="testimonial">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="testimonial-slider slider">
              <Slider {...settings}>
                <div className="testimonial-item">
                  <div className="row">
                    <div className="col-12 col-lg-9">
                      <div className="left">
                        <h6>Historias de nuestros pacientes</h6>
                        <h2>Testimonios</h2>
                        <p>
                          Mi experiencia en la clínica ha sido excelente. Desde el primer momento me
                          hicieron sentir cómodo y me explicaron todo el proceso con claridad. La
                          limpieza dental fue rápida y sin dolor, y los resultados son notables.
                          Definitivamente recomendaría la clínica a mis amigos y familiares.
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="testimonial-profile text-center">
                        <div>
                          <div className="profile-icon">
                            <img src={PatientOne} alt="Juan Carlos Tercero" />
                          </div>
                          <h4>Juan Carlos Tercero</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-item">
                  <div className="row">
                    <div className="col-12 col-lg-9">
                      <div className="left">
                        <h6>Historias de nuestros pacientes</h6>
                        <h2>Testimonios</h2>
                        <p>
                          El visitar la clínica ha sido una gran ayuda para mi salud bucal. Había
                          estado lidiando con un dolor de muelas por semanas, pero después de
                          visitar la clínica, el problema se resolvió rápidamente y sin problemas.
                          El personal fue muy amable y servicial durante todo el proceso
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="testimonial-profile text-center">
                        <div>
                          <div className="profile-icon">
                            <img src={PatientTwo} alt="Daniela Quezada" />
                          </div>
                          <h4>Daniela Quezada</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-item">
                  <div className="row">
                    <div className="col-12 col-lg-9">
                      <div className="left">
                        <h6>Historias de nuestros pacientes</h6>
                        <h2>Testimonios</h2>
                        <p>
                          Visitar la clínica fue una de las mejores decisiones que he tomado para mi
                          salud dental. El personal fue muy profesional y eficiente, y me sentí muy
                          cómodo durante todo el proceso. La atención personalizada que recibí
                          realmente me hizo sentir como si estuviera en buenas manos.
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3">
                      <div className="testimonial-profile text-center">
                        <div>
                          <div className="profile-icon">
                            <img src={PatientThree} alt="Grace Rivera" />
                          </div>
                          <h4>Grace Rivera</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
