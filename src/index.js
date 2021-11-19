import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./store/AuthContext";
// import { useAuth } from "./store/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
