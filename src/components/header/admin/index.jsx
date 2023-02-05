import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import AdminLogo from "../../../assets/images/admin-logo.png";
import SideBarLogo from "../../../assets/images/sidebar-logo.png";

import "./index.css";

function Header() {
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
        <li className="nav-item dropdown main-drop">
          <button type="button" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <span className="user-img">
              <img src="" alt="generic avatar" />
              <span className="status online" />
            </span>
          </button>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <img src="" alt="generic avatar" className="avatar-img rounded-circle" />
              </div>
              <div className="user-text">
                <h6>Donald Niles</h6>
                <p className="text-muted mb-0">Administrator</p>
              </div>
            </div>
            <Link className="dropdown-item" to="/admin/profile">
              <i className="me-1">
                <FeatherIcon icon="user" />
              </i>
              My Profile
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
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
