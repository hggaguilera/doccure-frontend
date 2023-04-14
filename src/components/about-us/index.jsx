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
                Nuestros dientes desempeñan un papel crucial en nuestra rutina diaria. Desde
                masticar nuestra comida hasta hablar y sonreír, nuestros dientes nos permiten llevar
                a cabo una variedad de tareas esenciales.
              </p>
              <p>
                Nuestros dientes nos permiten masticar y triturar los alimentos para que puedan ser
                digeridos adecuadamente en nuestro sistema digestivo. Sin nuestros dientes,
                tendríamos dificultades para comer alimentos sólidos y tendríamos que depender de
                alimentos blandos o líquidos, lo que limitaría nuestra dieta y afectaría nuestra
                salud.
              </p>
              <p>
                Otro papel importante que desempeñan los dientes es en nuestra apariencia física.
                Una sonrisa brillante y saludable puede hacer una gran diferencia en cómo nos
                sentimos acerca de nosotros mismos y cómo somos percibidos por los demás. Los
                dientes manchados o dañados pueden afectar nuestra autoestima y nuestra confianza en
                nosotros mismos.
              </p>
              <p>
                Por último, nuestros dientes también pueden indicar problemas de salud más graves.
                La placa y las caries pueden llevar a la enfermedad de las encías, lo que puede
                provocar la pérdida de dientes y problemas de salud en otras partes del cuerpo.
                Además, las enfermedades crónicas como la diabetes pueden afectar la salud dental,
                lo que hace que la atención dental regular sea aún más importante.
              </p>
              <p className="mb-0">
                Por todas estas razones, en nuestra clínica ofrecemos el mejor cuidado al enfocarnos
                en brindar atención personalizada a cada uno de nuestros pacientes. Utilizamos
                tecnología de vanguardia y seguimos las últimas tendencias y técnicas en odontología
                para garantizar los mejores resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
