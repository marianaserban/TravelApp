import React, { Component } from 'react'
import "./Login.css";
import { post } from '../Axios'

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                surname: '',
                email: '',
                password: ''
            },
        };
    }

    //post catre server
    saveUser = async () => {
            let res = await post("http://localhost:8080/users/register", this.state.user).then(user => {
                if(user.message===undefined){
                    //alert('te-ai inregistrat la noi!')
                    //this.props.history.push('/');
                }else{
                    alert(user.message);
                    if(user.message==="user registered"){
                        this.props.history.push('/');
                    }
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.saveUser()

    };

    handleChange = (e) => {
        e.preventDefault();
        let newUser = this.state.user;
        console.log(e.target.name, e.target.value, newUser);
        newUser[e.target.name] = e.target.value;
        this.setState({ User: newUser });
    };

    haveAccount = () => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div>

                <div className="login-box">
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="user-box">
                            <input type="text" name="name" onChange={this.handleChange} />
                            <label>Name</label>

                        </div>
                        <div className="user-box">
                            <input type="text" name="surname"  onChange={this.handleChange} />
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
                        <button className="pulse" type="submit">Create Account</button>
                    </form>
                </div>
            </div>
        )
    }
}
