import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import { App } from "./app/Index";

// setup fake backend
import { configureFakeBackend } from "./_helpers";
configureFakeBackend();
// import { configureFakeBackendForBlacklist } from "./_blacklistHelpers";
// configureFakeBackendForBlacklist();

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
