import React from "react";
import Layout from "../../../components/layout/client";
import Banner from "../../../components/banner";
import HomePoints from "../../../components/home-points";
import ConnectWithUs from "../../../components/connect-with-us";
import Location from "../../../components/location";
import AboutUs from "../../../components/about-us";
import Testimonials from "../../../components/testimonials";
import OurDoctors from "../../../components/our-doctors";
import Appointment from "../../../components/appointment";
import Loader from "../../../components/loader";

function Home({ doctorsData, isLoading, error }) {
  return (
    <>
      {isLoading ? <Loader /> : null}
      <Layout>
        <div className="main-wrapper">
          <Banner />
          <HomePoints />
          <ConnectWithUs />
          <Location />
          <AboutUs />
          <Testimonials />
          {!error ? <OurDoctors doctors={doctorsData} /> : null}
          <Appointment doctors={doctorsData} />
        </div>
      </Layout>
    </>
  );
}

export default Home;
