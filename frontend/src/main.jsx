import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoot from "./tools/AppRoot";
import { AuthContextProvider } from "./tools/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppRoot />
    </AuthContextProvider>
  </React.StrictMode>
);
