import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

ReactDOM.hydrate(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
  document.getElementById("root")
);
