import React, { Component } from 'react'
import "./Login.css";
import { post } from '../Axios'
import {getId, setId} from '../Utils'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {

                email: '',
                password: ''
            },

        };
    }

    //post catre server
    loginUser = async () => {
        let res = await post("http://localhost:8080/users/login", this.state.user)
        if(res.ok){
            setId(res.id)
            this.props.history.push('/dashboard');
            console.log(res)
        }else{
            alert(res.message)
        }
      
    }
    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let newUser = this.state.user;
        console.log(e.target.name, e.target.value, newUser);
        newUser[e.target.name] = e.target.value;
        this.setState({ User: newUser });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.loginUser()
    };

    render() {
        return (
            <div>
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="user-box">
                            <input type="text" name="email" required="" onChange={this.handleChange} />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" required=""onChange={this.handleChange}  />
                            <label>Password</label>
                        </div>

                        <a href="/register"><input className="pulse" type="button" value="Register" /></a>
                        {/* <input className="pulse" type="button" value="Login"/> */}
                        <button type="submit">Login</button>

                    </form>
                </div>
            </div>
        )
    }
}
