import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ItensProvider } from "./context/ItensContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ItensProvider>
      <App />
    </ItensProvider>
  </React.StrictMode>
);
