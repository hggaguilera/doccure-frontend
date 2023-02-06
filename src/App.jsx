import React from "react";
import { Routes, Route } from "react-router-dom";
import { useGetDoctorsQuery } from "./services/doctor";

// Client
import Home from "./pages/client/home";
import ContactUs from "./pages/client/contact-us";
import TermsAndConditions from "./pages/client/terms-and-conditions";
import PrivacyPolicy from "./pages/client/privacy-policy";

// Admin
import Dashboard from "./pages/admin/dashboard";

function App() {
  const { data, error, isLoading } = useGetDoctorsQuery();

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={<Home doctorsData={data} isLoading={isLoading} error={error} />}
      />
      <Route path="/contact-us" exact element={<ContactUs />} />
      <Route path="/terms" exact element={<TermsAndConditions />} />
      <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
      <Route path="/admin" exact element={<Dashboard />} />
      <Route path="/admin/appointments" exact element={<Dashboard />} />
      <Route path="/admin/specialities" exact element={<Dashboard />} />
      <Route path="/admin/doctors" exact element={<Dashboard />} />
      <Route path="/admin/patients" exact element={<Dashboard />} />
    </Routes>
  );
}

export default App;
