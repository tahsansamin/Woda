import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import passenger from "./resources/passenger.png";
import rider from "./resources/rider.png";

import { useContext, useState, useEffect } from "react";
import { LocationContext } from "./context/location";
import { BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  const { latitude, setLatitude } = useContext(LocationContext);
  const { longitude, setLongitude } = useContext(LocationContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      localStorage.setItem('longitude',position.coords.longitude)
      localStorage.setItem('latitude',position.coords.latitude)
      setLongitude(position.coords.longitude);
    });
    
  });
  return (
    <div className="App">
      <h1 className="logo">
        Woda<br></br>
      </h1>
      <i className="slogan">Driven by women for women</i>
      <br></br>
      <div className="mt-5 gap-3 d-flex justify-content-center">
        <Link to="/passenger">
          <button type="button" className="btn btn-danger rounded">
            <img src={passenger} width="100px" />
            <br></br>Request ride
          </button>
        </Link>

        <Link to="/rider">
          <button type="button" className="btn btn-danger rounded">
            <img src={rider} width="100px" />
            <br></br>Rider Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;

//@ Copyright 2022, Tahsan Samin, All rights reserved