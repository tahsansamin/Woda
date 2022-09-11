import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';


export default function Addride() {
  return (
    <Card>
        <Card.Body>
            <input placeholder='Where to?' className='custom-input'></input>
            <Button variant="danger">Place Order</Button>

        </Card.Body>
    </Card>
    
  )
}
