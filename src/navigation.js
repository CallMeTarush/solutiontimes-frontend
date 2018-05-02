import React from 'react';
import './css/navigation.css';

import { NavLink } from 'react-router-dom';


class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.toggleClass1 = this.toggleClass1.bind(this);
        this.toggleClass2 = this.toggleClass2.bind(this);
        this.toggleClass3 = this.toggleClass3.bind(this);
        this.toggleClass4 = this.toggleClass4.bind(this);
        
        this.state = {
            active1: true,
            active2: false,
            active3: false,
            active4: false
        };
    }

    toggleClass1() {
        
        // this = this;
        // console.log(this);
        const currentState = this.state.active1;
        this.setState({   
            active1: true,
            active2: false,
            active3: false,
            active4: false });
        
    };
    
    toggleClass2() {
        
        const currentState = this.state.active2;
        this.setState({   
            active1: false,
            active2: true,
            active3: false,
            active4: false 
        });
       
    };
    
    toggleClass3() {
        
        const currentState = this.state.active3;
        this.setState({   
            active1: false,
            active2: false,
            active3: true,
            active4: false });
        
    };

    toggleClass4() {
        
        const currentState = this.state.active4;
        this.setState({   
            active1: false,
            active2: false,
            active3: false,
            active4: true });
        
    };

    render() {
       return (
         <div>
            <ul>
                
                <li className={this.state.active1 ? 'selected': 'null'} onClick={this.toggleClass1} ><NavLink className={this.state.active1 ? 'selected': 'null'} to='/'>Requests</NavLink></li>
                <li className={this.state.active2 ? 'selected': 'null'} onClick={this.toggleClass2}><NavLink className={this.state.active2 ? 'selected': 'null'} to='/checkin'>Check-in</NavLink></li>
                <li className={this.state.active3 ? 'selected': 'null'} onClick={this.toggleClass3}><NavLink className={this.state.active3 ? 'selected': 'null'} to='/feedback'>Feedback</NavLink></li>
                <li className={this.state.active4 ? 'selected': 'null'} onClick={this.toggleClass4}><NavLink className={this.state.active4 ? 'selected': 'null'} to='/logout'>Log Out</NavLink></li>
          
            </ul>
            
         </div>
       );
    }
 }
 
 export default App;
 