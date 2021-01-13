import React, { Component, useEffect,useRef } from 'react'
import { getId, setId } from '../Utils'
import Navbar from './Navbar';
import lottie from 'lottie-web';
import "./Dashboard.css";

function Dashboard() {

    const container = useRef(null)
  
    useEffect(() => {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../bus.json')
      })
    }, [])
    
    return (
      <div className="App">
        <Navbar />
        <div className="container" ref={container}></div>
      </div>
    );
  }
  // class Dashboard extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: getId()
//         };
//     }
    
//     render() {
//         const container = useRef(null)

//         useEffect(() => {
//             lottie.loadAnimation({
//              container: container.current,
//              renderer: 'svg',
//              loop: true,
//              autoplay: true,
//              animationData: require('../bus.json')
//            })
//          }, [])

//         return (
//             <div>
//                 <Navbar />
//                 utilizator logat: {this.state.id}
//                 <div className="container"></div>
//             </div>
//         )
//     }
// }

export default Dashboard