import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { UserProvider } from "./Context/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <React.Fragment>
    <Router>
      <UserProvider>
        <ToastContainer />
        <App />
      </UserProvider>
    </Router>
  </React.Fragment>
  // </React.StrictMode>
);
