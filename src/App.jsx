import React from "react";
import { Routes, Route } from "react-router-dom";
import { Tooltip } from "bootstrap";

// Protected Route Layout
import ProtectedRoute from "./components/protected-route";

// Client
import Home from "./pages/client/home";
import ContactUs from "./pages/client/contact-us";
import TermsAndConditions from "./pages/client/terms-and-conditions";
import PrivacyPolicy from "./pages/client/privacy-policy";

// Admin
import Dashboard from "./pages/admin/dashboard";
import Appointments from "./pages/admin/appointments";
import Doctors from "./pages/admin/doctors";
import Patients from "./pages/admin/patients";
import Patient from "./pages/admin/patient";
import Specialties from "./pages/admin/specialties";
import Services from "./pages/admin/services";

// Auth
import Login from "./pages/auth/login";
import Confirm from "./pages/auth/confirm";

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
      <Route path="/auth/login" exact element={<Login />} />
      <Route path="/auth/confirm" exact element={<Confirm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" exact element={<Dashboard />} />
        <Route path="/admin/appointments" exact element={<Appointments />} />
        <Route path="/admin/specialties" exact element={<Specialties />} />
        <Route path="/admin/services" exact element={<Services />} />
        <Route path="/admin/doctors" exact element={<Doctors />} />
        <Route path="/admin/patients" exact element={<Patients />} />
        <Route path="/admin/patients/new" exact element={<Patient />} />
        <Route path="/admin/patients/edit/:patientId" exact element={<Patient editMode />} />
      </Route>
    </Routes>
  );
}

export default App;
