import { Link, useLocation } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

import "./index.css";

function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Pricipal</span>
              </li>
              <li className={pathname === "/admin" ? "active" : ""}>
                <Link to="/admin">
                  <i className="fe fe-home" /> <span>Dashboard</span>
                </Link>
              </li>
              <li className={pathname.includes("appointments") ? "active" : ""}>
                <Link to="/admin/appointments">
                  <i className="fe fe-layout" /> <span>Citas</span>
                </Link>
              </li>
              <li className={pathname.includes("specialties") ? "active" : ""}>
                <Link to="/admin/specialties">
                  <i className="fe fe-users" /> <span>Especialidades</span>
                </Link>
              </li>
              <li className={pathname.includes("doctors") ? "active" : ""}>
                <Link to="/admin/doctors">
                  <i className="fe fe-user-plus" /> <span>Doctores</span>
                </Link>
              </li>
              <li className={pathname.includes("patients") ? "active" : ""}>
                <Link to="/admin/patients">
                  <i className="fe fe-user" /> <span>Pacientes</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}

export default Sidebar;
