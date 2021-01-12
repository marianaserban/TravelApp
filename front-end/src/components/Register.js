import React, { Component } from 'react'
import "./Login.css";
import { post } from '../Axios'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
);

const formValid = ({ errors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(errors).forEach((val) => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach((val) => {
        val === null && (valid = false);
    });

    return valid;
};

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
            errors: {
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
                    alert('te-ai inregistrat la noi!')
                    this.props.history.push('/');
                }else{
                    alert(user.message);
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (formValid(this.state)) {
            console.log(this.state.errors);
            this.saveUser()
        } else {
            console.error("FORM INVALID");
        }
    };

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = { ...this.state.errors };
        let newUser = this.state.user;
        console.log(e.target.name, e.target.value, newUser);
        newUser[e.target.name] = e.target.value;
        this.setState({ User: newUser });
        // switch (name) {
        //     case "user.name":
        //         errors.name =
        //             value.length < 3 ? "minimum 3 characaters required" : "";
        //         break;
        //     case "surname":
        //         errors.surname =
        //             value.length < 3 ? "minimum 3 characaters required" : "";
        //         break;
        //     case "email":
        //         errors.email = emailRegex.test(value)
        //             ? ""
        //             : "invalid email address";
        //         break;
        //     case "password":
        //         errors.password =
        //             value.length < 6 ? "minimum 6 characaters required" : "";
        //         break;
        //     default:

        //         break;
        // }

        // this.setState({ errors, [name]: value }, () => console.log(this.state));
    };

    haveAccount = () => {
        this.props.history.push("/");
    };

    render() {
        const { errors } = this.state;
        return (
            <div>

                <div className="login-box">
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="user-box">
                            <input type="text" name="name" className={errors.name.length > 0 ? "error" : null} noValidate onChange={this.handleChange} />
                            <label>Name</label>
                            {errors.name.length > 0 && (
                                <span className="errorMessage">{errors.name}</span>
                            )}


                        </div>
                        <div className="user-box">
                            <input type="text" name="surname" className={errors.name.length > 0 ? "error" : null} noValidate onChange={this.handleChange} />
                            <label>Surname</label>
                            {errors.name.length > 0 && (
                                <span className="errorMessage">{errors.name}</span>
                            )}
                            
                        </div>
                        <div className="user-box">
                            <input type="text" name="email" required="" onChange={this.handleChange} />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" required="" onChange={this.handleChange} />
                            <label>Password</label>
                        </div>

                        {/* <input className="pulse" type="button" value="Register" /> */}
                        <button type="submit">Create Account</button>

                    </form>
                </div>
            </div>
        )
    }
}
