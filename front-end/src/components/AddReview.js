import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'


export default class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId()
        };
    }
    render() {
        return (
            <div>
                <Navbar />
                formular adauga review de catre utiliz cu id: {this.state.id}
            </div>
        )
    }
}
