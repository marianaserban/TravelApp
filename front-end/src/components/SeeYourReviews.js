import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'
import { get } from '../Axios'
import ReviewsTable from "./ReviewsTable";

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
    render() {
        return (
            <div>
                <Navbar />

                <h1>Your reviews</h1>
                <ReviewsTable reviews={this.state.reviews} />
            </div>
        )
    }
}