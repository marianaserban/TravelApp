import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'
import { post } from '../Axios'


export default class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            review: {
                origin: '',
                destination: '',
                mean_of_transport: 'METRO',
                departure_hour: '',
                trip_duration: '',
                crowdedness: '',
                observations: '',
                satisfaction_level: '',
                user_id: getId()
            }
        };
    }

    //post catre server
    saveReview = async () => {
        let res = await post(`http://localhost:8080/users/${this.state.id}/review`, this.state.review).then(review => {
            if (review.message === undefined) {
                //alert('te-ai inregistrat la noi!')
                //this.props.history.push('/');
            } else {
                alert(review.message);
                if (review.message === "created") {
                    this.props.history.push('/');
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
                <form onSubmit={this.handleSubmit} noValidate>
                    formular adauga review de catre utiliz cu id: {this.state.id}
                // input sau select name sa fie acelasi cu ce e in state.reiview.PROPNAME
                <input type="text" name="origin" onChange={this.handleChange} />
                    <input type="text" name="destination" onChange={this.handleChange} />
                    <input type="text" name="mean_of_transport" onChange={this.handleChange} />
                    <input type="text" name="departure_hour" onChange={this.handleChange} />
                    <input type="text" name="trip_duration" onChange={this.handleChange} />
                    <input type="text" name="crowdedness" onChange={this.handleChange} />
                    <input type="text" name="observations" onChange={this.handleChange} />
                    <input type="text" name="satisfaction_level" onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}
