/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/@fortawesome/fontawesome-free/js/all";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";
ReactDOM.render( 
  <React.StrictMode>
    <ContextProvider> 
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
