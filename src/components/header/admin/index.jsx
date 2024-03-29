import React, { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import FeatherIcon from "feather-icons-react";
import Dropdown from "react-bootstrap/Dropdown";
import profiles from "../../../libs/doctors";
import Profile from "../../../assets/images/profile.png";
import AdminLogo from "../../../assets/images/admin-logo.png";
import SideBarLogo from "../../../assets/images/sidebar-logo.png";

import "./index.css";

const CustomDropdown = forwardRef(({ children }, ref) => (
  <li className="nav-item dropdown main-drop" ref={ref}>
    {children}
  </li>
));
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <button type="button" ref={ref} className="dropdown-toggle nav-link" onClick={(e) => onClick(e)}>
    {children}
  </button>
));

function Header({ username, email, isLoading }) {
  const navigate = useNavigate();

  const handleSidebarResize = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const handleSidebarMobile = () => {
    document.body.classList.toggle("slide-nav");
  };

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/admin" className="logo">
          <img src={AdminLogo} alt="Logo" />
        </Link>
        <Link to="/admin" className="logo logo-small">
          <img src={SideBarLogo} alt="Logo" width={30} height={30} />
        </Link>
        <button type="button" id="toggle_btn" onClick={handleSidebarResize}>
          <FeatherIcon icon="chevrons-left" />
        </button>
      </div>
      <button
        type="button"
        className="mobile_btn"
        id="mobile_btn"
        onClick={() => handleSidebarMobile()}
      >
        <i className="fas fa-bars" />
      </button>
      <ul className="nav nav-tabs user-menu">
        <Dropdown as={CustomDropdown}>
          <Dropdown.Toggle as={CustomToggle}>
            <span className="user-img">
              <img src={isLoading ? Profile : profiles[email].thumb} alt="generic avatar" />
              <span className="status online" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img
                  src={isLoading ? Profile : profiles[email].thumb}
                  alt="generic avatar"
                  className="avatar-img rounded-circle"
                />
              </div>
              <div className="user-text">
                <h6>{username}</h6>
              </div>
            </div>
            <Link className="dropdown-item" to="/admin/profile">
              <i className="me-1">
                <FeatherIcon icon="user" />
              </i>
              Mi Perfil
            </Link>
            {/* <Link className="dropdown-item" to="/admin/settings">
              <i className="me-1">
                <FeatherIcon icon="edit" />
              </i>{" "}
              Settings
            </Link> */}
            <hr className="my-0 ms-2 me-2" />
            <button
              type="button"
              className="dropdown-item"
              onClick={() => {
                Cookies.remove("token");
                navigate("/auth/login");
              }}
            >
              <i className="me-1">
                <FeatherIcon icon="log-out" />
              </i>
              Cerrar Sesion
            </button>
          </Dropdown.Menu>
        </Dropdown>
        {/* <li className="nav-item dropdown main-drop">
          <button
            type="button"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="user-img">
              <img src={isLoading ? Profile : profiles[email].thumb} alt="generic avatar" />
              <span className="status online" />
            </span>
          </button>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img src="" alt="generic avatar" className="avatar-img rounded-circle" />
              </div>
              <div className="user-text">
                <h6>{username}</h6>
              </div>
            </div>
            <Link className="dropdown-item" to="/admin/profile">
              <i className="me-1">
                <FeatherIcon icon="user" />
              </i>
              Mi Perfil
            </Link>
            <Link className="dropdown-item" to="/admin/settings">
              <i className="me-1">
                <FeatherIcon icon="edit" />
              </i>{" "}
              Settings
            </Link>
            <hr className="my-0 ms-2 me-2" />
            <Link className="dropdown-item" to="/admin/login">
              <i className="me-1">
                <FeatherIcon icon="log-out" />
              </i>
              Cerrar Sesion
            </Link>
          </div>
        </li> */}
      </ul>
    </div>
  );
}

export default Header;
