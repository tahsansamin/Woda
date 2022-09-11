import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import axios from 'axios'
import { useContext } from "react";
import { LocationContext } from "../context/location";

export default function Trip(props) {
  const {curstart,setStart} = useContext(LocationContext)
  const {curend,setEnd} = useContext(LocationContext)
  const {curprice,setPrice} = useContext(LocationContext)
  const {modal,setmodal} = useContext(LocationContext)
  const {curid,setid} = useContext(LocationContext)
  const ID = props.id
  function handledelete(){
    let url = `http://127.0.0.1:8000/rides/${ID}`;
    axios.delete(url);
  }
  function handleaccept(){
    setEnd(props.destination)
    setStart(props.start)
    setPrice(props.money)
    setmodal(true)
    setid(ID)

  }
  return (
    <Card>
      <Card.Header>Trip Request</Card.Header>
      <Card.Body>
        <Card.Title>From:{props.start}</Card.Title>
        <Card.Title>To: {props.destination}</Card.Title>
        <Card.Title>Earning: {props.money}</Card.Title>
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleaccept}>Accept Ride</Button>
          <Button variant="danger" onClick={handledelete}>Refuse Ride</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
