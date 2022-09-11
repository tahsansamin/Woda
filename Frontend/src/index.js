import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

import App from "./App";
import Riderpage from "./pages/rider-page";
import Passengerpage from "./pages/passenger-page";
import { LocationProvider } from "./context/location";

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocationProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rider" element={<Riderpage />} />
        <Route path="/passenger" element={<Passengerpage />} />
      </Routes>
    </Router>
  </LocationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//@ Copyright 2022, Tahsan Samin, All rights reserved