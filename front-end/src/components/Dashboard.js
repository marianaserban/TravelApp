import React, { Component } from 'react'
import {getId, setId} from '../Utils'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:getId()
        };
    }

 
    render() {
        return (
            <div>
                aici e dashul a
                {this.state.id}
            </div>
        )
    }
}
