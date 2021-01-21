import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'
import { post } from '../Axios'
import './AddReview.css'

export default class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            review: {
                origin: '',
                destination: '',
                meanOfTransport: '',
                departureHour: '',
                tripDuration: '',
                crowdedness: '',
                observations: '',
                satisfactionLevel: '',
                // user_id: getId()
            }
        };
    }

    //post catre server
    saveReview = async () => {
        let res = await post(`http://localhost:8080/user/${this.state.id}/review`, this.state.review).then(review => {
            if (review.message === undefined) {
            } else {
                alert(review.message);
                if (review.message === "created") {
                    alert('Review added')
                    this.props.history.push('/seeYourReviews');
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.saveReview()

    };

    handleChange = (e) => {
        e.preventDefault();
        let newReview = this.state.review;
        console.log(e.target.name, e.target.value, newReview);
        newReview[e.target.name] = e.target.value;
        this.setState({ review: newReview });
    };

    render() {
        return (
            <div>
                <Navbar />
                <div className="clasuta">
                    <div className="login-box">
                        <h2>Add a review</h2>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="user-box">
                                <input type="text" name="origin" onChange={this.handleChange} />
                                <label>Origin</label>

                            </div>
                            <div className="user-box">
                                <input type="text" name="destination" onChange={this.handleChange} />
                                <label>Destination</label>

                            </div>

                            <div className="review_input">
                                <select name="meanOfTransport"
                                    onChange={this.handleChange} >
                                    <option value="BUS">Bus</option>
                                    <option value="TRAM">Tram</option>
                                    <option value="METRO">Metro</option>
                                </select>

                            </div>

                            <div className="user-box">
                                <input type="text" name="departureHour" onChange={this.handleChange} />
                                <label>Departure hour</label>
                            </div>

                            <div className="user-box">
                                <input type="text" name="tripDuration" onChange={this.handleChange} />
                                <label>Trip duration</label>

                            </div>

                            <div className="user-box">
                                <input type="text" name="crowdedness" onChange={this.handleChange} />
                                <label>Crowdedness</label>

                            </div>

                            <div className="user-box">
                                <input type="text" name="observations" onChange={this.handleChange} />
                                <label>Observations</label>

                            </div>
                            <div className="user-box">
                                <input type="text" name="satisfactionLevel" onChange={this.handleChange} />
                                <label>Satisfaction level</label>
                            </div>
                            <button className="pulse" type="submit">Add</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}