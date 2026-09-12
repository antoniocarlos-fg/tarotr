import React from "react";
import ReactDOM from "react-dom/client";
import Tiragem from "./tiragem";
import "./App.css"; // reaproveita o mesmo CSS/Tailwind

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Tiragem />
  </React.StrictMode>
);