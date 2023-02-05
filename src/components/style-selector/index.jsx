/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from "react";

const ClientStyles = React.lazy(() => import("../styles/client-style"));
const AdminStyles = React.lazy(() => import("../styles/admin-style"));

function StyleSelector({ children }) {
  const [pageUrl, setPageUrl] = useState();

  useEffect(() => {
    const clientRoutes = ["/", "/contact-us", "/terms", "/privacy-policy"];

    if (window.location.pathname.includes("admin")) {
      setPageUrl("admin");
    } else if (clientRoutes.includes(window.location.pathname)) {
      setPageUrl("client");
    }
  }, []);

  return (
    <>
      <React.Suspense fallback={<></>}>
        {pageUrl === "admin" && <AdminStyles />}
        {pageUrl === "client" && <ClientStyles />}
      </React.Suspense>
      {children}
    </>
  );
}

export default StyleSelector;
