import React, { Component } from 'react'
import "./Login.css";



export default class Login extends Component {
    
    render() {
        return (
            <div>
                <div className="login-box">
                    <h2>Login</h2>
                    <form>
                        <div className="user-box">
                        <input type="text" name="" required=""/>
                        <label>Email</label>
                        </div>
                        <div className="user-box">
                        <input type="password" name="" required=""/>
                        <label>Password</label>
                        </div>

                        <a href="/register"><input className="pulse" type="button" value="Register" /></a>
                        <input className="pulse" type="button" value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}
