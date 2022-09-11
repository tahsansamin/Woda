import React, { Component } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import axios from "axios";
import "./passengerpage.css";
import Addride from "../components/addride";
import { useState, useContext, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { LocationContext } from "../context/location";

const Passengerpage = () => {
  const { latitude, setLatitude } = useContext(LocationContext);
  const { longitude, setLongitude } = useContext(LocationContext);
  const { destinations } = useContext(LocationContext);
  const [useraddress, setaddress] = useState("");
  const [curcost,setcost] = useState(0)
  const [curdist,setdist] = useState(0)
  const [esttime,settime] = useState(0)
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const myloc = [longitude, latitude];

  var origins = [{ point: { latitude: latitude, longitude: longitude } }];
  const clearmap = () => {
    window.location.reload();
    console.log(longitude);
    console.log(latitude);
  };

  const converToPoint = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const drawRoute = (geoJson, map) => {
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJson,
      },
      paint: {
        "line-color": "#4a90e2",
        "line-width": 6,
      },
    });
  };
  const addDeliveryMarker = (lngLat, map) => {
    new tt.Marker().setLngLat(lngLat).addTo(map);
  };
  useEffect(() => {
    console.log(latitude);

    let map = tt.map({
      key: process.env.REACT_APP_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      zoom: 14,
    });

    setMap(map);

    ttapi.services
      .reverseGeocode({
        key: process.env.REACT_APP_API_KEY,
        position: `${longitude},${latitude}`,
      })
      .then((origin_position) => {
        setaddress(
          `${origin_position.addresses[0].address.municipalitySubdivision}`
        );
      });

    let marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);

    map.on("click", (e) => {
      const coords = e.lngLat;
      destinations.push(coords);
      console.log(e.lngLat);
      console.log(destinations);
      addDeliveryMarker(e.lngLat, map);
    });
  }, []);
  function callbackFn(routeGeoJson) {
    console.log(routeGeoJson);
  }

  const test = () => {
    const pointsForDestination = destinations.map((destination) => {
      return converToPoint(destination);
    });

    ttapi.services
      .matrixRouting({
        key: process.env.REACT_APP_API_KEY,
        origins: origins,
        destinations: pointsForDestination,
        traffic: true,
      })
      .then((matrixResults) => {
        const results = matrixResults.matrix[0];

        const resultsArray = results.map((result, index) => {
          return {
            drivingtime: result.response.routeSummary.travelTimeInSeconds,
            totaldistance: result.response.routeSummary.lengthInMeters,
          };
        });

        const totaldistance = resultsArray[0].totaldistance / 1000;
        const totalcost = totaldistance * 650;

        ttapi.services
          .reverseGeocode({
            key: process.env.REACT_APP_API_KEY,
            position: `${destinations[0].lng},${destinations[0].lat}`,
          })
          .then((destination_position) => {
            console.log(destination_position);
            console.log(
              destination_position.addresses[0].address.municipalitySubdivision
            );

            axios.post("http://127.0.0.1:8000/rides/", {
              start_destination: useraddress,
              end_destination: `${destination_position.addresses[0].address.municipalitySubdivision}`,
              distance: parseInt(totaldistance),
              cost: parseInt(totalcost),
            });
          });
      });
      window.alert("Rider will arrive shortly!")
  };

  const drawonmap = () => {
    const pointsForDestination = destinations.map((destination) => {
      return converToPoint(destination);
    });

    ttapi.services
      .matrixRouting({
        key: process.env.REACT_APP_API_KEY,
        origins: origins,
        destinations: pointsForDestination,
        traffic: true,
      })
      .then((matrixResults) => {
        const results = matrixResults.matrix[0];

        const resultsArray = results.map((result, index) => {
          return {
            drivingtime: result.response.routeSummary.travelTimeInSeconds,
            totaldistance: result.response.routeSummary.lengthInMeters,
          };
        });

        const totaldistance = Math.round(resultsArray[0].totaldistance / 1000)
        const totalcost = Math.round(totaldistance * 650)
        const totaltime = Math.round(results[0].drivingtime)
        setcost(totalcost)
        setdist(totaldistance)
        settime(totaltime)
      });
    ttapi.services
      .calculateRoute({
        key: process.env.REACT_APP_API_KEY,
        locations: `${longitude},${latitude}:${destinations[0].lng},${destinations[0].lat}`,
      })
      .then((routeData) => {
        const geoJson = routeData.toGeoJson();
        drawRoute(geoJson, map);
      });
  };
  return (
    <div>
      <div className="d-flex flex-column bg-danger ">
        <div className="d-flex justify-content-around topcard">
          <Button onClick={drawonmap}>Calculate route</Button>
          <Button onClick={clearmap}>Clear map</Button>
          <Button onClick={test}>Place order</Button>
        </div>
        <div className="d-flex justify-content-between topcard">
          <h2 className="ms-5">UGX{curcost}</h2>
          <h2 className="me-5">{curdist} Km</h2>
          
        </div>
      </div>

      <div ref={mapElement} className="map"></div>
      <h1>
        Your location is {longitude} and {latitude}
      </h1>
    </div>
  );
};

export default Passengerpage;
//@ Copyright 2022, Tahsan Samin, All rights reserved