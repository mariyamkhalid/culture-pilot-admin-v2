import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Tours from "./pages/Tours";
import Orgs from "./pages/Orgs";
import OutdoorObjects from "./pages/OutdoorObjects";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="orgs/:city" element={<Orgs />}></Route>
        <Route exact path="tours/:orgId/:city" element={<Tours />}></Route>
        <Route
          path="objects/:tourId/:city"
          element={<OutdoorObjects />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
