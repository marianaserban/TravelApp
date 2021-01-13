import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'



export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId()
        };
    }
    updatePass = () => {
        this.props.history.push({
          pathname: "/resetPassword",
          state: { id: this.state.id },
        });

      };
    render() {
        return (
            <div>
                <Navbar />
                aici o sa fie pg de profil a utiliz cu id: {this.state.id}
                {/* <a href="/resetPassword"><input className="pulse" type="button" value="Update Password"/></a> */}
                <button className="pulse" onClick={this.updatePass}>Update Password</button>

            </div>
        )
    }
}
