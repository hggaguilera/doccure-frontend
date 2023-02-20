/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import ScrollToTop from "./components/scroll-to-top";
import StyleSelector from "./components/style-selector";
import App from "./App";
import { store } from "./store";

// Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// International Tel Input
import "react-intl-tel-input/dist/main.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// Mapbox
import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <StyleSelector>
            <App />
          </StyleSelector>
        </ScrollToTop>
      </Router>
    </Provider>
  </React.StrictMode>,
);
