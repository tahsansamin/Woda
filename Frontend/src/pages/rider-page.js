import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import coin from "../resources/coin.png";
import { useContext, useEffect } from "react";
import "./rider-page.css";
import { LocationContext } from "../context/location";
import Trip from "../components/trip";
import axios from "axios";
import Modalride from "../components/modal";

export default function Riderpage() {
  const { balance, setBalance } = useContext(LocationContext);
  const { ridelist, setride } = useContext(LocationContext);
  const { modal, setmodal } = useContext(LocationContext);
  const {curid,setid} = useContext(LocationContext)
  function refreshList() {
    axios //Axios to send and receive HTTP requests
      .get("http://127.0.0.1:8000/rides/")
      .then((res) => setride(res.data));
  };
  useEffect(() => {
    // Update the document title using the browser API
    refreshList();
  });

  return (
    
    <div className="app">
      
      
      {modal ? <Modalride id={curid}/> : null}
      <div className="d-flex justify-content-end">
        <img src={coin}></img>
        <h2 className="align-self-center">{balance}</h2>
      </div>
      <div className="mt-4 ms-3 me-3">
        {ridelist.map((ride) => (
          <Trip
            start={ride.start_destination}
            destination={ride.end_destination}
            money={ride.cost}
            id={ride.id}
          />
        ))}
      </div>
    </div>
  );
}
//@ Copyright 2022, Tahsan Samin, All rights reserved