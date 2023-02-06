/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import Slider from "react-slick";

import profiles from "../../libs/doctors.json";

function OurDoctors({ doctors }) {
  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="our-doctors" className="doctors-col">
      <div className="container">
        <div className="row justify-content-center">
          <div className="doctors-title text-center">
            <h6>Conoce a Nuestros Doctores</h6>
            <h2>Nuestros Doctores</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="doctor-slider slider slick-initialized slick-slider">
              <Slider {...settings}>
                {doctors?.map((doctor) => {
                  const { prefix, firstName, lastName, specializations, email } = doctor;

                  return (
                    <div className="profile-widget">
                      <div className="doc-img">
                        <img
                          className="img-fluid"
                          alt={`foto de ${prefix} ${firstName} ${lastName}`}
                          src={profiles[email].profilePic}
                        />
                      </div>
                      <div className="pro-content">
                        <h3 className="title">
                          {firstName} {lastName}
                        </h3>
                        <p className="speciality">
                          {prefix} - {specializations[specializations.length - 1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurDoctors;
