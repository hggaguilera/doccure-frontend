import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ContactUs from "./pages/contact-us";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/contact-us" exact element={<ContactUs />} />
      <Route path="/terms" exact element={<TermsAndConditions />} />
      <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
