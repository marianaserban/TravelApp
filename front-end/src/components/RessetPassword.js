import React, { Component } from 'react'
import Axios from "axios";


export default class RessetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
           id:0,
            user: {
                password: '',
                oldPassword: ''
            }

        };
    }

    //update catre server
    updateUser = async () => {
        this.state.id = this.props.location.state.id;
        Axios.patch(`http://localhost:8080/users/updatePassword/${this.state.id}`, JSON.stringify(this.state.user),
            {
                headers: { "Content-Type": "application/json" }
            }
        ).then((res) => {
            alert('Password updated')
            this.props.history.push(`/`)
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
    handleChange = (e) => {
        e.preventDefault();
        let newUser = this.state.user;
        console.log(e.target.name, e.target.value, newUser);
        newUser[e.target.name] = e.target.value;
        this.setState({ User: newUser });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.updateUser()
    };

    render() {
        return (
            <div>
                <div className="login-box">
                    <h2>Resset Password</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="user-box">
                            <input type="password" name="password" required="" onChange={this.handleChange} />
                            <label>New password</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="oldPassword" required="" onChange={this.handleChange} />
                            <label>Old password</label>
                        </div>
                        <button className="pulse" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
