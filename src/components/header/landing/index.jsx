import { Link, NavLink } from "react-router-dom";
import "./index.css";

function Header() {
  const openMobileMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };

  const closeMobileMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  return (
    <header className="header home">
      <div className="top-header">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-8 col-xl-6">
              <div className="left">
                <ul>
                  <li>
                    <span>
                      <i className="fas fa-phone-alt" /> Numero de Contacto:{" "}
                      <a href="tel:+50522222222">+505 2222-2222</a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-map-marker-alt" /> Locacion: 22, South Wales, New York
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-xl-6">
              <div className="right">
                <ul>
                  <li>
                    <span>
                      <i className="fas fa-calendar-check" /> Lun - Vie : 09.00 AM to 05.00 PM
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg header-nav">
        <div className="navbar-header">
          <button type="button" id="mobile_btn" onClick={() => openMobileMenu()}>
            <span className="bar-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
          <Link to="/home" className="navbar-brand logo">
            <img src="" className="img-fluid" alt="Logo" />
          </Link>
        </div>
        <div className="main-menu-wrapper">
          <div className="menu-header">
            <Link to="/home" className="menu-logo">
              <img src="" className="img-fluid" alt="Logo" />
            </Link>
            <button
              type="button"
              id="menu_close"
              className="menu-close"
              onClick={() => closeMobileMenu()}
            >
              <i className="fas fa-times" />
            </button>
          </div>
          <ul className="main-nav">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
                Inicio
              </NavLink>
            </li>
            <li>
              <a href="#connecting-with-us">Conecta con nosotros</a>
            </li>
            <li>
              <a href="#caring-for-your-teeth">Cuidado de tus dientes</a>
            </li>
            <li>
              <a href="#testimonials">Testimonios</a>
            </li>
            <li>
              <a href="#our-doctors">Nuestros doctores</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
