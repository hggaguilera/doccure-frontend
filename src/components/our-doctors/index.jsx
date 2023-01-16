/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import Slider from "react-slick";

function OurDoctors() {
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
                <div className="profile-widget">
                  <div className="doc-img">
                    <img className="img-fluid" alt="User" src="" />
                  </div>
                  <div className="pro-content">
                    <h3 className="title">Denby Cathey</h3>
                    <p className="speciality">MBBS, MD - Ophthalmology</p>
                  </div>
                </div>

                <div className="profile-widget">
                  <div className="doc-img">
                    <img className="img-fluid" alt="User" src="" />
                  </div>
                  <div className="pro-content">
                    <h3 className="title">Orali Fisher</h3>
                    <p className="speciality">BDS - Dental Cosmetology</p>
                  </div>
                </div>

                <div className="profile-widget">
                  <div className="doc-img">
                    <img className="img-fluid" alt="User" src="" />
                  </div>
                  <div className="pro-content">
                    <h3 className="title">Gennaro Weiner</h3>
                    <p className="speciality">MDS - Dental Cosmetology</p>
                  </div>
                </div>

                <div className="profile-widget">
                  <div className="doc-img">
                    <img className="img-fluid" alt="User" src="" />
                  </div>
                  <div className="pro-content">
                    <h3 className="title">Jerelyn Pino</h3>
                    <p className="speciality">MBBS, DNB - Cardiology</p>
                  </div>
                </div>

                <div className="profile-widget">
                  <div className="doc-img">
                    <img className="img-fluid" alt="User" src="" />
                  </div>
                  <div className="pro-content">
                    <h3 className="title">Rieko Thrash</h3>
                    <p className="speciality">MBBS, MS - General Surgery</p>
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

export default OurDoctors;
