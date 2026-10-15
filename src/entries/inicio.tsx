import React from "react";
import ReactDOM from "react-dom/client";
import Inicio from "../pages/Inicio";
import "../styles/app.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Inicio />
  </React.StrictMode>,
);
