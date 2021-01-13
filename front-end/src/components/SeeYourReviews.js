import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'

export default class SeeYourReviews extends Component {
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

                aici sunt review urile ale utiliz cu id:{this.state.id}
            </div>
        )
    }
}
