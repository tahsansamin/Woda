import React from "react";
import {  Button,Modal } from "react-bootstrap";
import axios from 'axios'
import { useContext } from "react";
import { LocationContext } from "../context/location";

export default function Modalride(props) {
  const ID = props.id
  const { curstart, setStart } = useContext(LocationContext);
  const { curend, setEnd } = useContext(LocationContext);
  const { curprice, setPrice } = useContext(LocationContext);
  const { balance, setBalance } = useContext(LocationContext);
  const { modal, setmodal } = useContext(LocationContext);
  function handlefinish() {
    setmodal(false);
    setBalance(balance + curprice);
    let url = `http://127.0.0.1:8000/rides/${ID}`;
    axios.delete(url);

  }
  return (
    <>
      <Modal
        show={setmodal}
        
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Pickup:{curstart}<br></br></h1>
          <h1>Destination:{curend}</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlefinish}>
            Finish ride
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}
