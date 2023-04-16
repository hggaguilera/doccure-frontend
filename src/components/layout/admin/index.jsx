import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Header from "../../header/admin";
import Sidebar from "../../sidebar";

// Selectors
import {
  selectAuthRawData,
  selectUserAuthData,
  selectAuthError,
} from "../../../store/features/auth/selectors";

function Layout({ pageTitle, mainPage, mainPageUrl, currentPage, children }) {
  const token = Cookies.get("token");
  const { loading } = useSelector(selectAuthRawData);
  let userInfo = useSelector(selectUserAuthData);
  const authError = useSelector(selectAuthError);

  if (!userInfo && token) {
    const decoded = jwtDecode(token);

    userInfo = { name: decoded.name, email: decoded.username };
  }

  return (
    <div className="main-wrapper">
      <Header username={userInfo?.name} email={userInfo?.email} isLoading={loading} />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          {authError ? (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              Hubo un error al tratar de recolectar la informacion de el usuario
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              />
            </div>
          ) : null}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">{pageTitle}</h3>
                <ul className="breadcrumb">
                  {mainPage ? (
                    <li className="breadcrumb-item">
                      <Link to={mainPageUrl}>{mainPage}</Link>
                    </li>
                  ) : null}
                  <li className="breadcrumb-item active">{currentPage}</li>
                </ul>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
