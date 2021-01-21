import React from 'react';
import { Table } from 'react-bootstrap';
import "./Reviews.css";

export default function ReviewsTable(props) {
    return <>
        <Table striped bordered hover responsive>
            <tbody>
                <tr >
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Mean of transport</th>
                    <th>Departure hour</th>
                    <th>Trip duration</th>
                    <th>Crowdedness</th>
                    <th>Observations</th>
                    <th>Satisfaction level</th>
                    <th>Delete</th>
                    <th>Edit</th>

                </tr>
                {
                    props.reviews.map(review =>

                        <tr key={review.id}>
                            <td>{review.origin} </td>
                            <td>{review.destination}</td>
                            <td>{review.meanOfTransport}</td>
                            <td>{review.departureHour}</td>
                            <td>{review.tripDuration}</td>
                            <td>{review.crowdedness}</td>
                            <td>{review.observations}</td>
                            <td>{review.satisfactionLevel}</td>
                            <td>delete</td>
                            <td>edit</td>
                        </tr>)

                }

            </tbody>
        </Table>
    </>
}