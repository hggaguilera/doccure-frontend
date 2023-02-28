import React from "react";
import { Link } from "react-router-dom";
import Header from "../../header/admin";
import Sidebar from "../../sidebar";

function Layout({ pageTitle, mainPage, mainPageUrl, currentPage, children }) {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
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
