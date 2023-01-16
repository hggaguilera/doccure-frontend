import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <Link to="/" className="footer-logo logo">
                <img src="" className="img-fluid" alt="Logo" />
              </Link>
            </div>
            <div className="social-icon media-btn mt-3 mb-2 text-center">
              <ul>
                <li>
                  <a href="#0" target="_blank">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#0" target="_blank">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 mt-4 text-center">
              <ul className="policy-menu text-center">
                <li>
                  <a href="#caring-for-your-teeth">Acerca de Nosotros</a>
                </li>
                <li>
                  <a href="#our-doctors">Nuestros Doctores</a>
                </li>
                <li>
                  <Link to="/contact-us">Contactanos</Link>
                </li>
                <li>
                  <Link to="/terms">Terminos y Condiciones</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Politica de Privacidad</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="copyright">
            <div className="row">
              <div className="col-md-12 col-lg-12 text-center">
                <div className="copyright-text">
                  <p className="mb-0">&copy; 2023 Ms Dental Todos los Derechos Reservados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
