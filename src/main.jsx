import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//import BrowserRouter dari react router
import { BrowserRouter } from "react-router-dom";

//import CSS Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//import custom CSS
import "./assets/css/styles.css";
import "react-confirm-alert/src/react-confirm-alert.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
