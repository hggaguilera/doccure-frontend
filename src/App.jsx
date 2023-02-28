import React from "react";
import { Routes, Route } from "react-router-dom";
import { Tooltip } from "bootstrap";

// Client
import Home from "./pages/client/home";
import ContactUs from "./pages/client/contact-us";
import TermsAndConditions from "./pages/client/terms-and-conditions";
import PrivacyPolicy from "./pages/client/privacy-policy";

// Admin
import Dashboard from "./pages/admin/dashboard";
import Appointments from "./pages/admin/appointments";

function App() {
  // Tooltips
  // eslint-disable-next-line quotes
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));

  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/contact-us" exact element={<ContactUs />} />
      <Route path="/terms" exact element={<TermsAndConditions />} />
      <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
      <Route path="/admin" exact element={<Dashboard />} />
      <Route path="/admin/appointments" exact element={<Appointments />} />
      <Route path="/admin/specialities" exact element={<Dashboard />} />
      <Route path="/admin/doctors" exact element={<Dashboard />} />
      <Route path="/admin/patients" exact element={<Dashboard />} />
    </Routes>
  );
}

export default App;
