import React, { Component } from 'react'
import { getId, setId } from '../Utils'
import './AddReview.css'
import Axios from "axios"

export default class EditReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            reviewNew: {
                origin: '',
                destination: '',
                meanOfTransport: '',
                departureHour: '',
                tripDuration: '',
                crowdedness: '',
                observations: '',
                satisfactionLevel: '',
            }
        };
        this.state.id = this.props.location.state.id;
        this.state.review=this.props.location.state.review;
        console.log(this.state.id, this.state.review)
    }
    updateReview = async () => {
       
        Axios.put(`http://localhost:8080/user/${this.state.id}/review/${this.state.review.id}`, JSON.stringify(this.state.reviewNew),
            {
                headers: { "Content-Type": "application/json" }
            }
        ).then((res) => {
            alert('Review Updated')
            this.props.history.push(`/seeYourReviews`)
        })
            .catch(error => {
                if (error.response !== undefined) {
                    alert(error.response.data.message)
                } else {
                    alert('eroare')
                }
            }
            );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.updateReview()
    };

    handleChange = (e) => {
        e.preventDefault();
        let newReview = this.state.review;
        console.log(e.target.name, e.target.value, newReview);
        newReview[e.target.name] = e.target.value;
        this.setState({ reviewNew: newReview });
    };
    render() {
        return (
            <div>
                <div className="clasuta">
                    <div className="login-box">
                        <h2>Edit review</h2>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="user-box">
                                <input type="text" name="origin" value={this.state.review.origin} onChange={this.handleChange} />
                                <label>Origin</label>

                            </div>
                            <div className="user-box">
                                <input type="text" name="destination" value={this.state.review.destination} onChange={this.handleChange} />
                                <label>Destination</label>

                            </div>

                                <select name="meanOfTransport" value={this.state.review.meanOfTransport}
                                    onChange={this.handleChange} >
                                    <option value="BUS">Bus</option>
                                    <option value="TRAM">Tram</option>
                                    <option value="METRO">Metro</option>
                                </select>


                            <div className="user-box">
                                <input type="text" name="departureHour" value={this.state.review.departureHour} onChange={this.handleChange} />
                                <label>Departure hour</label>
                            </div>

                            <div className="user-box">
                                <input type="text" name="tripDuration" value={this.state.review.tripDuration} onChange={this.handleChange} />
                                <label>Trip duration</label>

                            </div>

                            <div className="user-box">
                                <input type="text" name="crowdedness" value={this.state.review.crowdedness} onChange={this.handleChange} />
                                <label>Crowdedness</label>

                            </div>

                            <div className="user-box">
                                <input type="text" name="observations" value={this.state.review.observations} onChange={this.handleChange} />
                                <label>Observations</label>

                            </div>
                            <div className="user-box">
                                <input type="text" name="satisfactionLevel" value={this.state.review.satisfactionLevel} onChange={this.handleChange} />
                                <label>Satisfaction level</label>
                            </div>
                            <button className="pulse" type="submit">Update</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}