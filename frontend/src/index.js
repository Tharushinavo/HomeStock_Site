import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot from ReactDOM
import "./index.css";
import App from "./App"; // ✅ Ensure this correctly imports App as default
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Corrected
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);



