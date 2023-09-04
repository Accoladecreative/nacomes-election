import React from 'react'
// import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import './mycard.css'

function MyCard({ img, title, text, imgHeight }) {
    return (
        <Card className='my-card m-2 w-sm-90 w-md-48 w-lg-48'
            border="warning" style={{ width: 'auto', maxWidth: '20rem', minWidth: '18em' }}>
            <Card.Img variant="top" src={img} height={imgHeight} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>

                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>)
}

export default MyCard