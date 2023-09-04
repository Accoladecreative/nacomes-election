import React from 'react'
import { Card } from 'react-bootstrap'
import './mycard.css'

export default function CandidateCard({ name, role, others, img }) {
    return (
        <Card className='my-card m-2 w-sm-90 w-md-48 w-lg-48'
            border="warning" >
            <Card.Img variant="top" src={img} height={250} />
            <Card.Body>
                <Card.Title>Name: {name}</Card.Title>
                <Card.Text>Level: {role}</Card.Text>
                <Card.Text>Role: {role}</Card.Text>

                <Card.Footer>
                    {others}
                </Card.Footer>

                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
    )

}