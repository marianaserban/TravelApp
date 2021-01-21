import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'
import { get } from '../Axios'
import { Table } from 'react-bootstrap';
import Axios from "axios"
import './Reviews.css'

export default class SeeYourReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            reviews: []
        };
        this.getReviews()
    }
    getReviews = async () => {
        let res = await get(`http://localhost:8080/user/${this.state.id}/reviews`, {})
        console.log('review-uri', res);
        this.setState({ reviews: res })
    }
    updateReview = () => {
        this.props.history.push({
          pathname: "/editReview",
          state: { id: this.state.id}
        });
      };
    render() {
        return (
            <div>
                <Navbar />

                <h1>Your reviews</h1>
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
                            this.state.reviews.map(review =>

                                <tr key={review.id}>
                                    <td>{review.origin} </td>
                                    <td>{review.destination}</td>
                                    <td>{review.meanOfTransport}</td>
                                    <td>{review.departureHour}</td>
                                    <td>{review.tripDuration}</td>
                                    <td>{review.crowdedness}</td>
                                    <td>{review.observations}</td>
                                    <td>{review.satisfactionLevel}</td>
                                    <td><button onClick={(e) =>
                                        Axios.delete(`http://localhost:8080/user/${this.state.id}/review/${review.id}`)
                                        .then((res)=>{
                                            alert('the review was succesfully deleted')
                                            this.getReviews()
                                        })
    
                                    }>Delete</button></td>
                                    <td><button onClick={(e) =>
                                        this.props.history.push({
                                            pathname: "/editReview",
                                            state: { id: this.state.id, review:review}
                                          })
                                    }>Edit</button></td>

                                </tr>)
                        }

                    </tbody>
                </Table>
            </div>
        )
    }
}