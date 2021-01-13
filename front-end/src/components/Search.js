import React, { Component } from 'react'
import Navbar from './Navbar';
import { getId, setId } from '../Utils'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: getId()
        };
    }
    render() {
        if(this.state.id){ //daca e logat pun navbarul ca sa mearga si pe alte optiuni, daca nu nu pun nav
            return (
                <div>
                    <Navbar />
                    aici o sa fie pagina de search 
                </div>
            )
        }else{
            return (
                <div>
                    aici o sa fie pagina de search fara nav ca n are alte optini
                </div>
            )
        }
          
    }
}
