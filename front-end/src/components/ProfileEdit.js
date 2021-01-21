import React, { Component } from 'react'
import { getId, setId } from '../Utils'
import './AddReview.css'
import Axios from "axios"

export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            userNew: {
                name:"",
                surname:"",
                email:"",
            }
        };
        this.state.id = this.props.location.state.id;
        this.state.user=this.props.location.state.user;
        console.log(this.state.id, this.state.user)
    }
    updateUser = async () => {
       
        Axios.put(`http://localhost:8080/profile/${this.state.id}`, JSON.stringify(this.state.userNew),
            {
                headers: { "Content-Type": "application/json" }
            }
        ).then((res) => {
            alert('Profile updated')
            this.props.history.push(`/profile`)
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
        this.updateUser()
    };

    handleChange = (e) => {
        e.preventDefault();
        let newUser = this.state.user;
        console.log(e.target.name, e.target.value, newUser);
        newUser[e.target.name] = e.target.value;
        this.setState({ userNew: newUser });
    };
    render() {
        return (
            <div>
                <div className="clasuta">
                    <div className="login-box">
                        <h2>Edit profile</h2>
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="user-box">
                                <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange} />
                                <label>Name</label>

                            </div>
                            <div className="user-box">
                                <input type="text" name="surname" value={this.state.user.surname} onChange={this.handleChange} />
                                <label>Surname</label>

                            </div>


                            <div className="user-box">
                                <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange} />
                                <label>Departure hour</label>
                            </div>
                            <button className="pulse" type="submit">Update</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}