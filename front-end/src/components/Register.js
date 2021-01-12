import React, { Component } from 'react'
import "./Login.css";

export default class Register extends Component {

    render() {
        return (
            <div>

                <div className="login-box">
                    <h2>Register</h2>
                    <form>
                        <div className="user-box">
                            <input type="text" name="name" required="" onChange={this.handleChange} />
                            <label>Name</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="surname" required="" onChange={this.handleChange} />
                            <label>Surname</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="email" required="" onChange={this.handleChange} />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" required="" onChange={this.handleChange} />
                            <label>Password</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password2" required="" onChange={this.handleChange} />
                            <label>Confirm password</label>
                        </div>

                        <input className="pulse" type="button" value="Register" onClick={this.registUser} />

                    </form>

                </div>


            </div>
        )
    }
}
