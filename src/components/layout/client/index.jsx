import React from "react";
import Header from "../../header/landing";
import Footer from "../../footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="content-page">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
