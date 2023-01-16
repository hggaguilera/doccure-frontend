import React from "react";
import SideImage from "../../assets/images/about-left.jpg";

import "./index.css";

function AboutUs() {
  return (
    <section id="caring-for-your-teeth" className="aboutus-col">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="about-left">
              <img src={SideImage} alt="dentist checking patient" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="about-right">
              <h6>Cuidando tus dientes</h6>
              <h2>Sus Dientes Juegan un Papel Importante en Nuestra Rutina Diaria</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo, sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium.
              </p>
              <p>
                Ddoloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo Sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium dolo remque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <p className="mb-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo, sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium dolo remque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo Sed ut perspi ciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
