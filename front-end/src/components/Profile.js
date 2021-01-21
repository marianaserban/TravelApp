import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'
import { get } from '../Axios'
import './Profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId(),
            user: {}
        };

        this.getUserData();
    }
    updatePass = () => {
        this.props.history.push({
          pathname: "/resetPassword",
          state: { id: this.state.id },
        });

      };

      updateProfile = () => {
        this.props.history.push({
            pathname: "/profile/edit",
            state: { id: this.state.id },
          });
      }

    getUserData = async() => {
        let res = await get(`http://localhost:8080/profile/${this.state.id}`, {})
        console.log('rezultate profil', res);
        this.setState({ user: res })
    }
    render() {
        return (
            <div>
                <Navbar />
                <h1>{this.state.user.name} - {this.state.user.surname}<br/></h1>
                {/* <a href="/resetPassword"><input className="pulse" type="button" value="Update Password"/></a> */}
                <button className="pulse" onClick={this.updatePass} id="updatePass">Update Password</button>
                <button className="pulse" onClick={this.updateProfile} id="updateProfile">Update Profile</button>

            </div>
        )
    }
}
